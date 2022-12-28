/* eslint-disable indent */
import { comiOrNot } from './comiOrNot'
import { findTransfer } from './findTransfer'
import { findCuco } from './findCuco'
import { formatDate } from './formatDate'

/**
 * It creates an object with the options for the request
 * @param {any[]} itauFileContent - the content of the file
 * @param {number} i - number - the index of the array that is being iterated
 * @param {number} iteration - number
 * @returns An object with the following properties:
 * method: string
 * url: string
 * headers: { Authorization: string; 'Content-Type': string }
 * body: string
 */
export async function createRequestOptions(
	itauFileContent: string[][],
	i: number,
	iteration: number,
	conceptsNumberAndDebitOrCredit: {
		ConceptNumber: number
		Debit: number
		Credit: number
	}[]
): Promise<{
	request: {
		method: string
		url: string
		headers: { Authorization: string; 'Content-Type': string }
		body: string
	}
	error: string | unknown | null
}> {
	let transfer = await findTransfer(
		itauFileContent[i][6],
		Number(itauFileContent[i][4]),
		Number(itauFileContent[i][5]),
		formatDate(itauFileContent[i][2], 2),
		conceptsNumberAndDebitOrCredit
	)
	return {
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
					TRNF_ID_TRNF: ${transfer.id},
					EXTR_FECHA: '${formatDate(itauFileContent[i][2], 1)}', 
					CONC_ID_CONC: ${transfer.concept}, 
					EXTR_SALDO: ${Number(itauFileContent[i][7])}, 
					EXTR_DEBITO: ${Number(itauFileContent[i][4])}, 
					EXTR_CREDITO: ${Number(itauFileContent[i][5])}, 
					CUCO_ID_CUCO: ${findCuco(iteration)}, 
					EXTR_MARCA_DE_COMISION: ${comiOrNot(itauFileContent[i][6])}
				}`,
			}),
		},
		error: transfer.error,
	}
}
