import { ConnectionPool } from 'mssql'
import { findSharedConcept } from './findSharedConcept'
import { groupBy } from './groupBy'

export async function findSharedTransfers(
	pool: ConnectionPool,
	type: string,
	date: string,
	extractAmount: number,
	createdIds: string
): Promise<number | false> {
	let result = await pool
		.request()
		.query(
			`SELECT TRNF_ID, ${type}_CONCEPTO_ID, ${type}_TE2, TRNF_IMPORTE FROM V_EXTRACTS WHERE CAST(TRNF_FECHA AS DATE) LIKE '${date}%' AND TRNF_EXTRACTO_COMPARTIDO = 'S' AND TRNF_ID NOT IN (0 ${createdIds})`
		)

	let transfersGroupedByTE2: any[][] = groupBy(result.recordset, 'CLIE_TE2')

	return findSharedConcept(transfersGroupedByTE2, extractAmount, type)
}
