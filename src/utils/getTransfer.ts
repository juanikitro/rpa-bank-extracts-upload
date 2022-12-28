import { ConnectionPool } from 'mssql'
import { sendTransferQuery } from './sendTransferQuery'

let createdIds: number[] = []
export async function getTransfer(
	pool: ConnectionPool,
	debit: number,
	credit: number,
	date: string
): Promise<
	| { id: number | null; concept: number; error: string | unknown }
	| { id: number | null; concept: number; error: null }
> {
	if (credit > debit) {
		let result = sendTransferQuery(pool, date, credit, 'CLIE', createdIds)
		let resultId = (await result).id
		if ((await result).error !== null) {
			return result
		} else {
			if (resultId !== null) {
				createdIds.push(resultId)
			}

			return result
		}
	} else {
		let result = sendTransferQuery(pool, date, debit, 'PROV', createdIds)
		let resultId = (await result).id
		if ((await result).error !== null) {
			return result
		} else {
			if (resultId !== null) {
				createdIds.push(resultId)
			}
			return result
		}
	}
}
