import { expect, test, jest } from '@jest/globals'
import { sendErrorMail } from '../../utils/nodemailer'

jest.setTimeout(360000)

test('Send an error mail', async () => {
	const emailTest = await sendErrorMail({
		where: 'nodemailer.test.ts',
		error: 'TEST',
	})

	expect(emailTest).toHaveProperty('accepted', expect.any(Array))
	expect(emailTest).toHaveProperty('envelope', {
		from: expect.any(String),
		to: expect.any(Array),
	})
	expect(emailTest).toHaveProperty('envelopeTime', expect.any(Number))
	expect(emailTest).toHaveProperty('messageId', expect.any(String))
	expect(emailTest).toHaveProperty('messageSize', expect.any(Number))
	expect(emailTest).toHaveProperty('messageTime', expect.any(Number))
	expect(emailTest).toHaveProperty('rejected', [])
	expect(emailTest.response).toMatch(new RegExp('^250?'))
	// expect(emailTest).toHaveProperty('response', expect.any(String))
})
