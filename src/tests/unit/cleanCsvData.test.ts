import { expect, test, jest } from '@jest/globals'
import { cleanCsvData } from '../../utils/cleanCsvData'
import { sleep } from '../../utils/sleep'

jest.setTimeout(360000)

test('Success clean csv data', async () => {
	let csvCleaned = await cleanCsvData(
		`${__dirname.split('unit')[0] + 'files'}`
	)
	let expected = [
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

	expect(csvCleaned).toStrictEqual(expected)
})

test('No wait to function', async () => {
	let csvCleaned = await cleanCsvData(
		`${__dirname.split('unit')[0] + 'files'}`
	)

	expect(csvCleaned).toStrictEqual([])
})

test('An error in the file directory', async () => {
	let csvCleaned = await cleanCsvData(
		`${__dirname.split('unit')[0] + 'nope'}`
	)

	expect(csvCleaned).toStrictEqual(false)
})
