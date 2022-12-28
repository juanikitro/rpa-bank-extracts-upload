import { expect, test } from '@jest/globals'
import { comiOrNot } from '../../utils/comiOrNot'

test('Send ...COMI... and recive true', () => {
	expect(comiOrNot('DEB. CAMBIOSCOMI..090179')).toStrictEqual(true)
})

test('Send ...MAN.RELACION... and recive true', () => {
	expect(comiOrNot('...911260OSMAN.RELACION..911260')).toStrictEqual(true)
})

test('Send ...COMISION... and recive false', () => {
	expect(comiOrNot('9988AS..8ACOMISION.123123')).toStrictEqual(true)
})

test('Send DEB. CAMBIOSST....090179 and recive false', () => {
	expect(comiOrNot('DEB. CAMBIOSST....090179')).toStrictEqual(false)
})
