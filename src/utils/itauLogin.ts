import { By, WebDriver } from 'selenium-webdriver'
import { sendErrorMail } from './nodemailer'
require('dotenv').config()

/**
 * Pass the login of Itau website
 * @param {WebDriver} driver - WebDriver
 */
export async function itauLogin(driver: WebDriver): Promise<true | unknown> {
	console.info({
		info: 'itauLogin()',
		date: new Date().toLocaleString('es-ES').toString(),
	})

	try {
		await driver
			.findElement(By.id('username'))
			.sendKeys(process.env.ITAU_USERNAME as string)

		await driver
			.findElement(By.id('passwd'))
			.sendKeys(process.env.ITAU_PASSWD as string)

		await driver
			.findElement(By.id('empresaNumDoc'))
			.sendKeys(process.env.ITAU_EMPRESANUMDOC as string)

		await driver.findElement(By.id('acceso_hb')).submit()

		return true
	} catch (error) {
		sendErrorMail({
			where: 'itauLogin.ts',
			error: error,
		})

		return false
	}
}
