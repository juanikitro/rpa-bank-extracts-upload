import { ConnectionPool } from 'mssql'
import { findSharedTransfers } from './findSharedTransfers'
import { sendErrorMail } from './nodemailer'

export async function sendTransferQuery(
	pool: ConnectionPool,
	date: string,
	amount: number,
	type: string,
	createdIds: number[] | string
): Promise<
	| { id: number | null; concept: number; error: string | unknown }
	| { id: number | null; concept: number; error: null }
> {
	try {
		let conceptoID: string = type + '_CONCEPTO_ID'

		if (createdIds.length > 0) {
			createdIds = ',' + createdIds
		} else {
			createdIds = ''
		}

		let result = await pool
			.request()
			.query(
				`SELECT TRNF_ID, ${conceptoID} FROM V_EXTRACTS WHERE CAST(TRNF_FECHA AS DATE) LIKE '${date}%' AND TRNF_IMPORTE = ${amount} AND TRNF_ID NOT IN (0 ${createdIds})`
			)

		if (result.recordset.length > 0) {
			if (result.recordset[0][conceptoID] === null) {
				return {
					id: result.recordset[0].TRNF_ID,
					concept: 601,
					error: null,
				}
			} else {
				return {
					id: result.recordset[0].TRNF_ID,
					concept: result.recordset[0][conceptoID],
					error: null,
				}
			}
		} else {
			let sharedConcept = await findSharedTransfers(
				pool,
				type,
				date,
				amount,
				createdIds
			)
			if (sharedConcept !== false) {
				return {
					id: null,
					concept: sharedConcept,
					error: null,
				}
			} else {
				return {
					id: null,
					concept: 0,
					error: `Transfer not found in YiQi. Date: ${date}, Credit/Debit: ${amount}`,
				}
			}
		}
	} catch (error) {
		sendErrorMail({
			where: 'itauLogin.ts',
			error: error,
		})

		return { id: null, concept: 0, error: error }
	}
}
