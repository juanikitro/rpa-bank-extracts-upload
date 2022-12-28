/**
 * It returns a id:number that is either 217, 203, 201, or 185 depending of the iteration
 * @param {number} iteration - number - this is the number of the iteration, it can be 1, 2, 3 or 4
 * @returns A number.
 */
export function findCuco(iteration: number): 217 | 203 | 201 | 185 {
	if (iteration === 1) {
		return 217 // Banco Itau SRL USD
	} else if (iteration === 2) {
		return 203 // Banco Itau MLA EUR
	} else if (iteration === 3) {
		return 201 // Banco Itau MLA USD
	} else {
		return 185 // Banco Itau P&P USD
	}
}
