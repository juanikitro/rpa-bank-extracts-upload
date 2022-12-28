import { expect, test } from '@jest/globals'
import { formatDate } from '../../utils/formatDate'

test('From 01JAN01 to 1/1/2001', () => {
	expect(formatDate('01JAN01', 1)).toStrictEqual('1/1/2001')
})

test('From 20OCT10 to 20/10/2010', () => {
	expect(formatDate('20OCT10', 1)).toStrictEqual('20/10/2010')
})

test('From 31DEC23 to 31/12/2023', () => {
	expect(formatDate('31DEC23', 1)).toStrictEqual('31/12/2023')
})

test('From 01JAN01 to 2001-01-01', () => {
	expect(formatDate('01JAN01', 2)).toStrictEqual('2001-01-01')
})

test('From 20OCT10 to 2010-10-20', () => {
	expect(formatDate('20OCT10', 2)).toStrictEqual('2010-10-20')
})

test('From 31DEC2023 to 2023-12-31', () => {
	expect(formatDate('31DEC2023', 2)).toStrictEqual('2023-12-31')
})
