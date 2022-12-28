/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, jest } from '@jest/globals'
import { ConnectionPool } from 'mssql'
import { getConnection } from '../../database/connection'
import { sendTransferQuery } from '../../utils/sendTransferQuery'

jest.setTimeout(360000)

test('Search for NOT FOUND transfer', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		expect(
			await sendTransferQuery(
				pool,
				'2023-12-31',
				571.53,
				'CLIE',
				[35103, 35102, 35101]
			)
		).toStrictEqual({
			id: null,
			concept: 0,
			error: 'Transfer not found in YiQi. Date: 2023-12-31, Credit/Debit: 571.53',
		})
	} else {
		throw new Error('Problems in the connection pool')
	}
})

test('Search for NO CONCEPT SUCCESS transfer (Can be expire in 6 months for the view)', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		expect(
			await sendTransferQuery(pool, '2022-10-21', 416.38, 'CLIE', [35103])
		).toStrictEqual({
			id: 35843,
			concept: 601,
			error: null,
		})
	} else {
		throw new Error('Problems in the connection pool')
	}
})

test('Search for SUCCESS transfer (Can be expire in 6 months for the view)', async () => {
	const pool: ConnectionPool | false = await getConnection()
	if (pool) {
		expect(
			await sendTransferQuery(
				pool,
				'2022-10-13',
				300000.0,
				'PROV',
				[35103, 35102, 35101]
			)
		).toStrictEqual({
			id: 35568,
			concept: 694,
			error: null,
		})
	} else {
		throw new Error('Problems in the connection pool')
	}
})
