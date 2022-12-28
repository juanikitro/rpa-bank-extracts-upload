export function isCommission(
	concept: string,
	todayDateNumber: string
): boolean {
	return !(
		concept.includes('COMI') ||
		concept.includes('MAN.RELACION') ||
		concept.includes('DEBITO') ||
		concept.includes('INICIAL') ||
		concept.includes('FINAL') ||
		concept[2].toString().slice(0, 2) === todayDateNumber
	)
}
