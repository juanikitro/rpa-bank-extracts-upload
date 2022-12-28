/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, jest } from '@jest/globals'
import { findTransfer } from '../../utils/findTransfer'

jest.setTimeout(360000)

test('Success find transfer', async () => {
	const transfer = await findTransfer(
		'DEB. CAMBIOSST....150860',
		2200,
		0,
		'2022-11-01',
		[]
	)

	expect(transfer).toStrictEqual({
		concept: 320,
		error: null,
		id: 36008,
	})
})

// test('Success multiples transfers', async () => {
// 	const transfer = await findTransfer(
// 		'DEB. CAMBIOSOP....150862',
// 		0,
// 		2000,
// 		'2022-05-31',
// 		[]
// 	)

// 	expect(transfer).toStrictEqual({
// 		concept: 601,
// 		error: null,
// 		id: null,
// 	})
// })

test('Success find credit commission', async () => {
	const transfer = await findTransfer(
		'DEB. CAMBIOSSTCOMI....150810',
		10,
		0,
		'2022-09-02',
		[{ ConceptNumber: 150810, Debit: 30000, Credit: 0 }]
	)

	expect(transfer).toStrictEqual({
		concept: 69,
		error: null,
		id: null,
	})
})

test('Success find debit commission', async () => {
	const transfer = await findTransfer(
		'DEB. CAMBIOSSTCOMI....150810',
		10,
		0,
		'2022-09-02',
		[{ ConceptNumber: 150810, Debit: 0, Credit: 30000 }]
	)

	expect(transfer).toStrictEqual({
		concept: 68,
		error: null,
		id: null,
	})
})

test('Success find bank commission', async () => {
	const transfer = await findTransfer(
		'DEB. CAMBIOSSTCOMI....150809',
		10,
		0,
		'2022-09-02',
		[]
	)

	expect(transfer).toStrictEqual({
		concept: 72,
		error: null,
		id: null,
	})
})

test('Transfer not found in YiQi', async () => {
	const transfer = await findTransfer(
		'DEB. CAMBIOSST....150866',
		0,
		31614.07,
		'20OCT22',
		[]
	)

	expect(transfer).toStrictEqual({
		concept: 0,
		error: 'Transfer not found in YiQi. Date: 20OCT22, Credit/Debit: 31614.07',
		id: null,
	})
})
