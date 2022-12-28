import fs from 'fs'
import readline from 'readline'

/**
 * It reads a file and returns its content as a two-dimensional array
 * @param {string} downloadDirectory - The directory where the file is located
 * @param {string} file - The file name of the file.
 * @returns An array of arrays.
 */
export function readFile(downloadDirectory: string, file: string): string[][] {
	let itauFileContent: string[][] = []
	let stream = fs.createReadStream(`${downloadDirectory + '/' + file}`)
	let reader = readline.createInterface({ input: stream })
	reader.on('line', (row) => {
		itauFileContent.push(row.split(','))
	})

	return itauFileContent
}
