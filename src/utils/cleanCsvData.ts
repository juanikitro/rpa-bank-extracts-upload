import { getSortedFiles } from './getSortedFiles'
import { sendErrorMail } from './nodemailer'
import { readFile } from './readFile'
import { sleep } from './sleep'

/**
 * It gets the latest file from the download directory, reads it, and returns the file content
 * @param {string} downloadDirectory - string
 * @returns A Promise that resolves to a boolean or a string[][]
 */
export async function cleanCsvData(
	downloadDirectory: string
): Promise<false | string[][]> {
	console.info({
		info: 'cleanCsvData()',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	let itauFile: string | unknown
	let itauFileContent: string[][]

	try {
		itauFile = await getSortedFiles(downloadDirectory)

		if (typeof itauFile === 'string') {
			itauFileContent = readFile(downloadDirectory, itauFile)

			sleep(3000)

			return itauFileContent
		} else {
			return false
		}
	} catch (error) {
		await sendErrorMail({
			where: 'cleanCsvData.ts',
			error: error,
		})
		return false
	}
}
