import nodemailer from 'nodemailer'
import { google } from 'googleapis'
require('dotenv').config()

const emailTo = process.env.MAILER_EMAILTO
const emailSubject = 'Error: creacion de extracto bancario'

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_ID_CLIENT,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
)

async function sendErrorMail(textForEmail) {
	oAuth2Client.setCredentials({
		refresh_token: process.env.REFRESH_TOKEN,
		tls: {
			rejectUnauthorized: false,
		},
	})
	console.error(textForEmail)
	try {
		const accessToken = await oAuth2Client.getAccessToken()

		const transport = nodemailer.createTransport({
			service: 'gmail',
			secure: true,
			requireTLS: true,
			port: 465,
			secured: true,
			auth: {
				type: 'OAuth2',
				user: process.env.MAILER_USER,
				clientId: process.env.GOOGLE_ID_CLIENT,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				accessToken: accessToken,
				refreshToken: process.env.REFRESH_TOKEN,
			},
		})

		let mailOptions = {
			from: process.env.MAILER_USER,
			to: emailTo,
			subject: emailSubject,
			text: `			Hola estimado!

			Hubo un error al querer crear un extracto bancario.
			Environment: ${process.env.NODE_ENV}
			Error: ${JSON.stringify(textForEmail)}`,
		}
		console.log({
			log: 'Error email sent',
			date: new Date().toLocaleString('es-ES').toString(),
		})

		return await transport.sendMail(mailOptions)
	} catch (error) {
		console.error({ where: 'nodemailer.js', error: error })
		return error
	}
}

export { sendErrorMail }
