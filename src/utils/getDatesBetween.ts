import { sendErrorMail } from './nodemailer'

export function addDays(date: Date, days: number): Date {
	const newDate = new Date(date.valueOf())
	newDate.setDate(newDate.getDate() + days)
	return newDate
}

export function getDatesBetween(
	startDay: Date,
	endDay: Date,
	data?: { startRegister: string[]; endRegister: string[] }
): string[] {
	if (startDay < endDay) {
		const dateArray = new Array()
		dateArray.push(startDay.toLocaleDateString('es-ES').toString())
		let currentDate = addDays(startDay, 1)
		while (currentDate <= endDay) {
			dateArray.push(currentDate.toLocaleDateString('es-ES').toString())
			currentDate = addDays(currentDate, 1)
		}

		return dateArray
	} else if (startDay > endDay) {
		sendErrorMail({
			where: 'getDatesBetween.ts',
			error: `startDay in the excel: ${startDay} > endDay in the excel: ${endDay}`,
			data,
		})

		return []
	} else {
		return []
	}
}
