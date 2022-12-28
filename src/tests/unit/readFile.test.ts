import { expect, test, jest } from '@jest/globals'
import { readFile } from '../../utils/readFile'
import { sleep } from '../../utils/sleep'

jest.setTimeout(360000)

test('Read file', async () => {
	let fileReaded = readFile(
		`${__dirname.split('unit')[0] + 'files'}`,
		'estadoDeCuenta.csv'
	)
	let expected: string[][] = [
		[
			'CUENTA',
			'MONEDA',
			'FECHA',
			'XX',
			'DEBE',
			'HABER',
			'CONCEPTO',
			'SALDO',
		],
		[
			'1941778',
			'US.D',
			'03OCT22',
			'0',
			'0',
			'7379883.84',
			'SALDO       INICIAL     ',
			'7379883.84',
		],
		[
			'1941778',
			'US.D',
			'04OCT22',
			'0',
			'99009.73',
			'0',
			'DEB. CAMBIOSST....090179',
			'7280874.11',
		],
		[
			'1941778',
			'US.D',
			'04OCT22',
			'0',
			'100',
			'0',
			'DEB. CAMBIOSCOMI..090179',
			'7280774.11',
		],
		[
			'1941778',
			'US.D',
			'11OCT22',
			'0',
			'0',
			'7235340.72',
			'SALDO       FINAL       ',
			'7235340.72',
		],
	]

	await sleep(3000)

	expect(fileReaded).toStrictEqual(expected)
})

test('No wait the function', async () => {
	let fileReaded = readFile(
		`${__dirname.split('unit')[0] + 'files'}`,
		'estadoDeCuenta.csv'
	)

	expect(fileReaded).toStrictEqual([])
})
