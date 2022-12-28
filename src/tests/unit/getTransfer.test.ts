/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, jest } from '@jest/globals'
import { ConnectionPool } from 'mssql'
import { getTransfer } from '../../utils/getTransfer'
import { getConnection } from '../../database/connection'

jest.setTimeout(360000)

test('Success search transfer (Can be expire in 6 months for the view)', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		const transfer = await getTransfer(pool, 300000, 0, '2022-10-13')
		const expected = {
			concept: 694,
			error: null,
			id: 35568,
		}

		expect(transfer).toStrictEqual(expected)
	} else {
		throw new Error('Problems in the connection pool')
	}
})

test('Success search transfer (Can be expire in 6 months for the view)', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		const transfer = await getTransfer(pool, 0, 50, '2022-10-12')
		const expected = {
			concept: 703,
			error: null,
			id: 35577,
		}

		expect(transfer).toStrictEqual(expected)
	} else {
		throw new Error('Problems in the connection pool')
	}
})

test('Failed get transfer bc transfer not found', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		const transfer = await getTransfer(pool, 30, 0, '2023-10-01')
		const expected = {
			concept: 0,
			error: 'Transfer not found in YiQi. Date: 2023-10-01, Credit/Debit: 30',
			id: null,
		}

		expect(transfer).toStrictEqual(expected)
	} else {
		throw new Error('Problems in the connection pool')
	}
})
