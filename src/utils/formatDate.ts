/**
 * format from DDMMMYY to DD/MM/YYYY or YYYY-MM-DD.
 * @param {string} date - string like DDMMMYY.
 * @param {number} format - number to change the returned format
 * @returns a string
 */
export function formatDate(date: string, format: number): string {
	date = date.replace('-', '')

	function getMonthFromString(mon: string): number {
		return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1
	}

	let day: number | string = parseInt(date.slice(0, 2))
	let monthString: string = date.slice(2, 5).toString()
	let month: number | string = getMonthFromString(monthString)
	let year: number = parseInt('20' + date.slice(date.length - 2))

	date = `${day}/${month}/${year}`

	if (format === 2) {
		if (month.toString().length < 2) {
			month = `0${month}`
		}
		if (day.toString().length < 2) {
			day = `0${day}`
		}
		date = `${day}/${month}/${year}`

		date = date
			.replace('/', '-')
			.replace('/', '-')
			.split('-')
			.reverse()
			.join('-')
	}

	return date
}
