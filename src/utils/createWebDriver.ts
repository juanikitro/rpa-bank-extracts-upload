import chrome from 'selenium-webdriver/chrome'
import { Builder } from 'selenium-webdriver'

export async function createWebDriver(downloadDirectory: string) {
	let options = new chrome.Options()
	options.setUserPreferences({
		'download.default_directory': downloadDirectory,
	})
	options.addArguments('--headless')
	options.addArguments('--no-sandbox')
	options.addArguments('--blink-settings=imagesEnabled=false')
	options.addArguments('--disable-dev-shm-usage')
	options.addArguments('--window-size=1920,1080')

	return await new Builder()
		.setChromeOptions(options)
		.forBrowser('chrome')
		.build()
}
