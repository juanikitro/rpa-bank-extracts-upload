import { ConnectionPool } from 'mssql'
import { getConnection } from '../database/connection'
import { getCommissionConcept } from './getCommissionConcept'
import { getTransfer } from './getTransfer'

const mssqlError = 'MSSQL connection pool === false or something broke'

export async function findTransfer(
	concept: string,
	debit: number,
	credit: number,
	date: string,
	conceptsNumberAndDebitOrCredit: {
		ConceptNumber: number
		Debit: number
		Credit: number
	}[]
): Promise<{
	id: number | null
	concept: number
	error: string | unknown | null
}> {
	if (
		concept.includes('COMI') ||
		concept.includes('GASTOS      MAN.RELACION') ||
		concept.includes('DEBITO      COMISION')
	) {
		let commissionConcept = getCommissionConcept({
			conceptsNumberAndDebitOrCredit,
			concept,
		})
		if (!commissionConcept) {
			return {
				id: null,
				concept: 72,
				error: null,
			}
		}
		return commissionConcept
	} else {
		const pool: ConnectionPool | false = await getConnection()
		if (pool !== false) {
			return getTransfer(pool, debit, credit, date)
		} else {
			return {
				id: null,
				concept: 0,
				error: mssqlError,
			}
		}
	}
}
