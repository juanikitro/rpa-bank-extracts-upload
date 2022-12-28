import { jest, expect, test } from '@jest/globals'
import { itauLogin } from '../../utils/itauLogin'
import { createWebDriver } from '../../utils/createWebDriver'
import { sleep } from '../../utils/sleep'

jest.setTimeout(360000)

test('Success Itau login', async () => {
	const downloadDirectory = `${__dirname.split('unit')[0] + 'files'}`
	let driver = await createWebDriver(downloadDirectory)
	driver = await driver
		.get('https://www.itau.com.uy/inst/index.html?app=ILE')
		.then(() => {
			return driver
		})

	await sleep(10000)

	expect(await itauLogin(driver)).toStrictEqual(true)
})

test('Failed Itau login', async () => {
	const downloadDirectory = `${__dirname.split('unit')[0] + 'file'}`
	let driver = await createWebDriver(downloadDirectory)
	driver = await driver.get('https://www.google.com').then(() => {
		return driver
	})

	await sleep(10000)

	expect(await itauLogin(driver)).toStrictEqual(false)
})
