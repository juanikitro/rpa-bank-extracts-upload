export function findSharedConcept(
	transfersGroupedByTE2: any[][],
	extractAmount: number,
	type: string
): false | number {
	let concept = false
	transfersGroupedByTE2.forEach((group: any[]) => {
		let amountsSum: number = 0
		group.forEach((transfer: { TRNF_IMPORTE: number }) => {
			amountsSum += transfer.TRNF_IMPORTE
		})

		if (amountsSum === extractAmount) {
			concept = group[0][`${type}_CONCEPTO_ID`]
		} else {
			concept = false
		}
	})

	return concept
}
