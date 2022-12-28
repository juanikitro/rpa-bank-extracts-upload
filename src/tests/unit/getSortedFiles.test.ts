import { expect, test } from '@jest/globals'
import { getSortedFiles } from '../../utils/getSortedFiles'

test('Find file', async () => {
	expect(
		await getSortedFiles(`${__dirname.split('unit')[0] + 'files'}`)
	).toStrictEqual('estadoDeCuenta.csv')
})

test('No such file or directory', async () => {
	expect(
		await getSortedFiles(`${__dirname.split('unit')[0] + 'file'}`)
	).not.toStrictEqual('estadoDeCuenta.csv')
})
