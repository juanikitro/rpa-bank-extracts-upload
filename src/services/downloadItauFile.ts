require('chromedriver')
require('dotenv').config()
import { itauFindAndDownloadFile } from './itauFindAndDownloadFile'
import { createWebDriver } from '../utils/createWebDriver'
import { sendErrorMail } from '../utils/nodemailer'

/**
 * It creates a webdriver, navigates to the Itaú website, and then calls the function that will find
 * and download the file
 * @param {number} iteration - number
 */
export async function downloadItauFile(iteration: number): Promise<void> {
	console.info({
		info: 'downloadItauFile()',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	const downloadDirectory = `${__dirname.split('services')[0] + 'downloads'}`
	try {
		let driver = await createWebDriver(downloadDirectory)
		driver
			.get('https://www.itau.com.uy/inst/index.html?app=ILE')
			.then(async function () {
				await itauFindAndDownloadFile(driver, iteration)
			})
	} catch (error) {
		await sendErrorMail({ where: 'downloadItauFile.ts', error: error })
	}
}
