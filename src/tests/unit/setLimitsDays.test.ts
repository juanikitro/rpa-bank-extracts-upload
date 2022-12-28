/* eslint-disable sonarjs/no-duplicate-string */
import { expect, it, describe } from '@jest/globals'
import { setLimitsDays } from '../../utils/setLimitsDays'

describe('setLimitsDays', () => {
	it('debe retornar las fechas de inicio y fin cuando se encuentran en el arreglo de entrada', () => {
		const itauFileContent = [
			[
				'CUENTA',
				'MONEDA',
				'FECHA',
				'XX',
				'DEBE',
				'HABER',
				'CONCEPTO',
				'SALDO',
			],
			[
				'1941778',
				'US.D',
				'04OCT22',
				'00',
				'000000000000.00',
				'000007159189.69',
				'SALDO       INICIAL     ',
				'7159189.69',
				'',
			],
			[
				'1941778',
				'US.D',
				'06OCT22',
				'00',
				'000000118952.90',
				'000000000000.00',
				'SALDO       FINAL     ',
				'7071820.86',
				'',
			],
		]
		const expected = {
			startDay: new Date('2022-04-10T00:00:00.000Z'),
			endDay: new Date('2022-06-10T00:00:00.000Z'),
		}
		expect(setLimitsDays(itauFileContent)).toEqual(expected)
	})

	it('debe retornar la fecha actual como fecha de inicio y fin cuando no se encuentran en el arreglo de entrada', () => {
		const itauFileContent = [
			['2022-01-01', '', '', '', '', '', ''],
			['2022-01-02', '', '', '', '', '', ''],
		]
		const expected = {
			startDay: new Date(),
			endDay: new Date(),
		}
		expect(setLimitsDays(itauFileContent)).toEqual(expected)
	})

	it('debe retornar la fecha actual como fecha de inicio y fin cuando el arreglo de entrada está vacío', () => {
		const itauFileContent: string[][] = []
		const expected = {
			startDay: new Date(),
			endDay: new Date(),
		}
		expect(setLimitsDays(itauFileContent)).toEqual(expected)
	})
})
