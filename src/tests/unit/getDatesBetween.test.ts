/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, it } from '@jest/globals'
import { getDatesBetween, addDays } from '../../utils/getDatesBetween'

const dateExample = '2022-01-01'
describe('getDatesBetween', () => {
	it('devuelve una matriz de fechas entre dos fechas dadas', () => {
		const startDay = new Date(dateExample)
		const endDay = new Date('2022-01-03')
		const expected = ['1/1/2022', '2/1/2022', '3/1/2022']
		expect(getDatesBetween(startDay, endDay)).toEqual(expected)
	})

	it('devuelve una matriz vacía si startDay es mayor que endDay', () => {
		const startDay = new Date('2022-01-03')
		const endDay = new Date('2022-01-01')
		expect(getDatesBetween(startDay, endDay)).toEqual([])
	})

	it('devuelve una matriz vacía si startDay es igual a endDay', () => {
		const startDay = new Date('2022-01-01')
		const endDay = new Date('2022-01-01')
		expect(getDatesBetween(startDay, endDay)).toEqual([])
	})
})

describe('addDays', () => {
	it('agrega los días especificados a una fecha dada', () => {
		const date = new Date('2022-01-01')
		const expected = new Date('2022-01-03')
		expect(addDays(date, 2)).toEqual(expected)
	})

	it('devuelve la misma fecha si se le agrega cero días', () => {
		const date = new Date('2022-01-01')
		expect(addDays(date, 0)).toEqual(date)
	})
})
