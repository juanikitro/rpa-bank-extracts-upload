import fs from 'fs'

export function removeDowloadedFile(path: string, fileName: string): void {
	return fs.unlinkSync(`${path}/${fileName}`)
}
