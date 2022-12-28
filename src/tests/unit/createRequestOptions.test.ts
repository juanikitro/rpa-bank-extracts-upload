/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, jest } from '@jest/globals'
import { createRequestOptions } from '../../utils/createRequestOptions'

jest.setTimeout(360000)

test('Failed request option creation bc transfer doesnt exist', async () => {
	let result = await createRequestOptions(
		[
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
				'04OCT22',
				'00',
				'000000000000.00',
				'000007159189.69',
				'SALDO       INICIAL     ',
				'7159189.69',
				'',
			],
			[
				'1941778',
				'US.D',
				'05OCT22',
				'00',
				'000000000030.00',
				'000000000000.00',
				'DEB. CAMBIOSCOMI..911260',
				'7159159.69',
				'',
			],
			[
				'1941778',
				'US.D',
				'05OCT22',
				'00',
				'000000000000.00',
				'000000031614.07',
				'CRE. CAMBIOSOP....911260',
				'7190773.76',
				'',
			],
			[
				'1941778',
				'US.D',
				'06OCT22',
				'00',
				'000000118952.90',
				'000000000000.00',
				'DEB. CAMBIOSST....150866',
				'7071820.86',
				'',
			],
		],
		3,
		3,
		[
			{ ConceptNumber: 911260, Debit: 0, Credit: 31614.07 },
			{ ConceptNumber: 150866, Debit: 118952.9, Credit: 0 },
			{ ConceptNumber: 150867, Debit: 57939.79, Credit: 0 },
			{ ConceptNumber: 150868, Debit: 30000, Credit: 0 },
		]
	)
	expect(result).toStrictEqual({
		request: {
			method: 'POST',
			url: process.env.YIQI_API_URL as string,
			headers: {
				Authorization: `Bearer ${process.env.YIQI_AUTH_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schemaId: process.env.YIQI_SCHEMA,
				entityName: 'EXTRACTO',
				jsonNewFiles: '{}',
				jsonRemovedFiles: '[]',
				json: `{
					TRNF_ID_TRNF: null,
					EXTR_FECHA: '5/10/2022', 
					CONC_ID_CONC: 0, 
					EXTR_SALDO: 7190773.76, 
					EXTR_DEBITO: 0, 
					EXTR_CREDITO: 31614.07, 
					CUCO_ID_CUCO: 201, 
					EXTR_MARCA_DE_COMISION: false
				}`,
			}),
		},
		error: 'Transfer not found in YiQi. Date: 2022-10-05, Credit/Debit: 31614.07',
	})
})

test('Success create request options', async () => {
	let result = await createRequestOptions(
		[
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
				'13OCT22',
				'00',
				'000000300000.00',
				'000000000000.00',
				'DEB. ABCDEF..911260',
				'7159159.69',
				'',
			],
		],
		1,
		1,
		[{ ConceptNumber: 911261, Debit: 0, Credit: 31614.07 }]
	)
	expect(result).toStrictEqual({
		request: {
			method: 'POST',
			url: process.env.YIQI_API_URL as string,
			headers: {
				Authorization: `Bearer ${process.env.YIQI_AUTH_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schemaId: process.env.YIQI_SCHEMA,
				entityName: 'EXTRACTO',
				jsonNewFiles: '{}',
				jsonRemovedFiles: '[]',
				json: `{
					TRNF_ID_TRNF: 35568,
					EXTR_FECHA: '13/10/2022', 
					CONC_ID_CONC: 694, 
					EXTR_SALDO: 7159159.69, 
					EXTR_DEBITO: 300000, 
					EXTR_CREDITO: 0, 
					CUCO_ID_CUCO: 217, 
					EXTR_MARCA_DE_COMISION: false
				}`,
			}),
		},
		error: null,
	})
})
