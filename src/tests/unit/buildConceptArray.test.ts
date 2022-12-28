import { expect, describe, it } from '@jest/globals'
import { getCommissionConcept } from '../../utils/getCommissionConcept'

describe('getCommissionConcept', () => {
	const conceptsNumberAndDebitOrCredit = [
		{ ConceptNumber: 1, Debit: 0, Credit: 0 },
		{ ConceptNumber: 2, Debit: 0, Credit: 10 },
	]

	it('should return false if linkedConceptFlag is false', () => {
		const concept = '3'
		expect(
			getCommissionConcept({ conceptsNumberAndDebitOrCredit, concept })
		).toBe(false)
	})

	it('should return an object with concept 68 if Credit is greater than Debit', () => {
		const concept = '2'
		expect(
			getCommissionConcept({ conceptsNumberAndDebitOrCredit, concept })
		).toEqual({ id: null, concept: 68, error: null })
	})

	it('should return an object with concept 69 if Debit is greater than Credit', () => {
		conceptsNumberAndDebitOrCredit[1].Debit = 10
		conceptsNumberAndDebitOrCredit[1].Credit = 0
		const concept = '2'
		expect(
			getCommissionConcept({ conceptsNumberAndDebitOrCredit, concept })
		).toEqual({ id: null, concept: 69, error: null })
	})
})
