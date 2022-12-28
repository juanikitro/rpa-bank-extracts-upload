import request from 'request'
import { findCuco } from './findCuco'
import { sendErrorMail } from './nodemailer'

export async function postInZeroExtract(date: string, iteration: number) {
	let options = {
		method: 'POST',
		url: process.env.YIQI_API_URL as string,
		headers: {
			Authorization: `Bearer ${process.env.YIQI_AUTH_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			schemaId: process.env.YIQI_SCHEMA,
			entityName: 'EXTRACTO',
			jsonNewFiles: '{}',
			jsonRemovedFiles: '[]',
			json: `{
			EXTR_FECHA: '${date}', 
			CONC_ID_CONC: '711', 
			EXTR_SALDO: 0,  
			EXTR_DEBITO: 0, 
			EXTR_CREDITO: 0, 
			CUCO_ID_CUCO: ${findCuco(iteration)}, 
			EXTR_MARCA_DE_COMISION: false
		}`,
		}),
	}

	request(options, async function (error, response) {
		if (error) {
			await sendErrorMail({
				where: 'postInZeroExtract.ts',
				error: error,
			})
		}
		if (JSON.parse(response.body).ok === false) {
			await sendErrorMail(
				JSON.stringify({
					Options: JSON.parse(options.body).json,
					Error: JSON.parse(response.body).error,
				})
			)
		} else {
			console.log({
				error: null,
				data: {
					RequestOk: JSON.parse(response.body).ok,
					NewId: JSON.parse(response.body).newId,
					Options: JSON.parse(options.body).json,
					Response: JSON.parse(response.body).parameter,
				},
			})
		}
	})
	return {
		error: 'Request skipped.',
		data: null,
	}
}
