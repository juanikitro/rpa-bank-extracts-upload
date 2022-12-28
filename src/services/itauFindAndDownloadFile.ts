import { By, until, WebDriver } from 'selenium-webdriver'
import { cleanCsvData } from '../utils/cleanCsvData'
import { itauLogin } from '../utils/itauLogin'
import { sendErrorMail } from '../utils/nodemailer'
import { removeDowloadedFile } from '../utils/removeDowloadedFile'
import { sleep } from '../utils/sleep'
import { manageExtracts } from './manageExtracts'

/**
 * It logs in to the bank's website, clicks on the "Historical Consultation" button, selects the "Last
 * 8 months" option, clicks on the "Download" button, and then cleans the downloaded file and saves it
 * to the database
 * @param {WebDriver} driver - WebDriver
 * @param {number} iteration - number
 */
export async function itauFindAndDownloadFile(
	driver: WebDriver,
	iteration: number
): Promise<void> {
	console.info({
		info: 'itauFindAndDownloadFile()',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	try {
		await itauLogin(driver).then(async () => {
			console.info({
				info: 'post itauLogin()',
				date: new Date().toLocaleString('es-ES').toString(),
			})
			await driver
				.wait(
					until.elementLocated(
						By.xpath(
							'//*[@id="wrapper"]/div[3]/div/div[1]/section[2]/h2'
						)
					)
				)
				.click()
			setTimeout(async () => {
				await driver
					.wait(
						until.elementLocated(
							By.xpath(
								`//*[@id="wrapper"]/div[3]/div/div[1]/section[2]/div/a[${iteration}]`
							)
						)
					)
					.click()
			}, 10000)

			/* await driver
			.wait(
				until.elementLocated(
					// eslint-disable-next-line quotes
					By.xpath("//a[contains(text(),'Consulta histórica')]")
				)
			)
			.click()
			.then(() => {
				setTimeout(async () => {
					await driver
						.wait(
							until.elementLocated(
								By.xpath(
									'//*[@id="formConsultaHistorica"]/div[1]/div[2]/select'
								)
							)
						)
						.click()
					setTimeout(async () => {
						await driver
							.wait(
								until.elementLocated(
									By.xpath(
										'//*[@id="formConsultaHistorica"]/div[1]/div[2]/select/option[8]'
									)
								)
							)
							.click()>*/
			setTimeout(() => {
				driver
					.wait(
						until.elementLocated(
							By.xpath(
								'//*[@id="wrapper"]/div[3]/div[3]/div/div[1]/ul/li[3]/button'
							)
						)
					)
					.click()
					.then(() => {
						setTimeout(async () => {
							let itauFileContent = await cleanCsvData(
								`${
									__dirname.split('services')[0] + 'downloads'
								}`
							)

							await sleep(3000)

							if (itauFileContent !== false) {
								await manageExtracts(
									itauFileContent,
									iteration
								).then(() => {
									removeDowloadedFile(
										`${
											__dirname.split('services')[0] +
											'downloads'
										}`,
										'estadoDeCuenta.csv'
									)
								})
							}
						}, 30000)
					})
			}, 10000)
			/*}, 10000)
			}, 10000)
		})*/
		})
	} catch (error) {
		await sendErrorMail({
			where: 'itauFindAndDownloadFile.ts',
			error: error,
		})
	}
}
