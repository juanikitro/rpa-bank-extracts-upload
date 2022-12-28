/* eslint-disable quotes */
import { formatDate } from '../utils/formatDate'
import { postExtract } from '../utils/postExtract'
import { getDatesBetween } from '../utils/getDatesBetween'
import { postInZeroExtract } from '../utils/postInZeroExtract'
import { buildConceptArray } from '../utils/buildConceptArray'
import { setLimitsDays } from '../utils/setLimitsDays'

interface MiniRegister {
	ConceptNumber: number
	Debit: number
	Credit: number
}

export async function manageExtracts(
	itauFileContent: string[][],
	iteration: number
) {
	console.info({
		info: 'manageExtracts()',
		date: new Date().toLocaleString('es-ES').toString(),
	})

	let conceptsNumberAndDebitOrCredit: MiniRegister[] = []
	let todayDateNumber: string = new Date().getDate().toString()
	if (todayDateNumber.length === 1) {
		todayDateNumber = '0' + todayDateNumber
	}

	const { startDay, endDay }: { startDay: Date; endDay: Date } =
		setLimitsDays(itauFileContent)

	conceptsNumberAndDebitOrCredit = buildConceptArray(
		itauFileContent,
		todayDateNumber
	)
	const datesWithoutRegister = getDatesBetween(startDay, endDay, {
		startRegister: itauFileContent.filter((register) =>
			register[6].includes('INICIAL')
		)[0],
		endRegister: itauFileContent.filter((register) =>
			register[6].includes('FINAL')
		)[0],
	})
	datesWithoutRegister.splice(-1)
	console.log({
		log: 'All dates',
		data: datesWithoutRegister,
		date: new Date().toLocaleString('es-ES').toString(),
	})

	for (let i = 1; i < itauFileContent.length; i++) {
		console.log({
			log: 'register',
			register: {
				cuenta: itauFileContent[i][0],
				moneda: itauFileContent[i][1],
				fecha: itauFileContent[i][2],
				xx: itauFileContent[i][3],
				debe: itauFileContent[i][4],
				haber: itauFileContent[i][5],
				concepto: itauFileContent[i][6],
				saldo: itauFileContent[i][7],
			},
			date: new Date().toLocaleString('es-ES').toString(),
		})

		if (
			!itauFileContent[i][6].includes('INICIAL') &&
			!itauFileContent[i][6].includes('FINAL') &&
			itauFileContent[i][2].toString().slice(0, 2) !== todayDateNumber
		) {
			await postExtract(
				itauFileContent,
				i,
				iteration,
				conceptsNumberAndDebitOrCredit
			)

			let formatedDate: string[] | Date = formatDate(
				itauFileContent[i][2],
				1
			).split('/')
			formatedDate = new Date(
				Number(formatedDate[2]),
				Number(formatedDate[1]) - 1,
				Number(formatedDate[0])
			)
			if (
				datesWithoutRegister.indexOf(
					formatedDate.toLocaleDateString('es-ES')
				) > -1
			) {
				datesWithoutRegister.splice(
					datesWithoutRegister.indexOf(
						formatedDate.toLocaleDateString('es-ES')
					),
					1
				)
				console.log('datesWithoutRegister: ' + datesWithoutRegister)
			}
		} else {
			console.log({
				log: 'Register skipped',
				register: itauFileContent[i],
				inicial: !itauFileContent[i][6].includes('INICIAL'),
				final: !itauFileContent[i][6].includes('FINAL'),
				isTodayRegister:
					itauFileContent[i][2].toString().slice(0, 2) !==
					todayDateNumber,
				date: new Date().toLocaleString('es-ES').toString(),
			})
		}
	}

	console.info({
		log: 'Dates without register',
		data: datesWithoutRegister,
		date: new Date().toLocaleString('es-ES').toString(),
	})
	for (const t in datesWithoutRegister) {
		await postInZeroExtract(datesWithoutRegister[t], iteration)
	}
}
