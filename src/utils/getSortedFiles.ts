import fs from 'fs'

export async function getSortedFiles(dir: string): Promise<string | unknown> {
	try {
		let files = await fs.promises.readdir(dir)
		let lastFileDownloaded: string = files
			.map((fileName) => ({
				name: fileName,
				time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
			}))
			.sort((a, b) => b.time - a.time)
			.map((file) => file.name)[0]

		return lastFileDownloaded
	} catch (error) {
		return error
	}
}
