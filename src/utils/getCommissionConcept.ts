export function getCommissionConcept({
	conceptsNumberAndDebitOrCredit,
	concept,
}: {
	conceptsNumberAndDebitOrCredit: {
		ConceptNumber: number
		Debit: number
		Credit: number
	}[]
	concept: string
}): false | { id: number | null; concept: number; error: null } {
	let linkedConceptFlag: boolean = false
	let linkedConceptIndex: number | null = null

	for (let k in conceptsNumberAndDebitOrCredit) {
		if (
			concept.includes(
				conceptsNumberAndDebitOrCredit[k].ConceptNumber.toString()
			)
		) {
			linkedConceptFlag = true
			linkedConceptIndex = conceptsNumberAndDebitOrCredit.indexOf(
				conceptsNumberAndDebitOrCredit[k]
			)
		}
	}

	if (linkedConceptFlag === true && linkedConceptIndex !== null) {
		if (
			conceptsNumberAndDebitOrCredit[linkedConceptIndex].Credit >
			conceptsNumberAndDebitOrCredit[linkedConceptIndex].Debit
		) {
			return {
				id: null,
				concept: 68,
				error: null,
			}
		} else {
			return {
				id: null,
				concept: 69,
				error: null,
			}
		}
	}

	return false
}
