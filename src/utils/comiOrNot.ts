/**
 * If the concept includes the words "COMI", "GASTOS      MAN.RELACION", or "DEBITO      COMISION", then
 * return true, otherwise return false
 * @param {string} concept - string
 * @returns A boolean value.
 */
export function comiOrNot(concept: string): boolean {
	return (
		concept.includes('COMI') ||
		concept.includes('MAN.RELACION') ||
		concept.includes('COMISION')
	)
}
