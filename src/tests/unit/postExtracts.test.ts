/* eslint-disable quotes */
import { expect, test, jest } from '@jest/globals'
import { postExtract } from '../../utils/postExtract'
import { sleep } from '../../utils/sleep'

jest.setTimeout(360000)

test('Success post extract', async () => {
	const itauFileContent: string[][] = [
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
			'12OCT22',
			'0',
			'50',
			'0',
			'DEB. CAMBIOSSTCOMI....090179',
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
	const conceptsNumberAndDebitOrCredit: {
		ConceptNumber: number
		Debit: number
		Credit: number
	}[] = [{ ConceptNumber: 150868, Debit: 30000, Credit: 0 }]
	let postedExtract = await postExtract(
		itauFileContent,
		2,
		2,
		conceptsNumberAndDebitOrCredit
	)

	sleep(10000)

	expect(postedExtract.error).toStrictEqual(null)
	expect(postedExtract.data?.RequestOk).toStrictEqual(true)
	expect(typeof postedExtract.data?.NewId).toStrictEqual('number')
})
