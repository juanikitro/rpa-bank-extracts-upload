/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, jest } from '@jest/globals'
import { ConnectionPool } from 'mssql'
import { getConnection } from '../../database/connection'
require('dotenv').config()

jest.setTimeout(360000)

test('Succes connection', async () => {
	const pool: ConnectionPool | false = await getConnection()

	expect(pool['_connected']).toStrictEqual(true)
})
