import { formatDate } from './formatDate'

interface LimitsDays {
	startDay: Date
	endDay: Date
}

export function setLimitsDays(itauFileContent: string[][]): LimitsDays {
	let startDay: Date = new Date()
	let endDay: Date = new Date()

	for (const row of itauFileContent) {
		if (row[6].includes('INICIAL')) {
			startDay = new Date(formatDate(row[2], 1))
		} else if (row[6].includes('FINAL')) {
			endDay = new Date(formatDate(row[2], 1))
		}
	}

	return { startDay, endDay }
}
