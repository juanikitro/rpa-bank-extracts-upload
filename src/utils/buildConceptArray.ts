import { isCommission } from '../utils/isCommission'

export function buildConceptArray(
	itauFileContent: string[][],
	todayDateNumber: string
): { ConceptNumber: number; Debit: number; Credit: number }[] {
	const result: { ConceptNumber: number; Debit: number; Credit: number }[] =
		[]
	for (let j = 1; j < itauFileContent.length; j++) {
		if (isCommission(itauFileContent[j][6], todayDateNumber)) {
			result.push({
				ConceptNumber: Number(
					itauFileContent[j][6].replace(/^\D+/g, '')
				),
				Debit: Number(itauFileContent[j][4]),
				Credit: Number(itauFileContent[j][5]),
			})
		}
	}

	return result
}
