/* eslint-disable sonarjs/no-duplicate-string */
import request from 'request'
import { createRequestOptions } from './createRequestOptions'
import { sendErrorMail } from './nodemailer'

/**
 * It sends a POST request to the YiQi API with the extract data.
 * @param {any[]} itauFileContent - the content of the file, which is an array of arrays
 * @param {number} i - number
 * @param {number} iteration - number - index
 * @param {object[]} conceptsNumberAndDebitOrCredit - array of objects in the downloaded excel
 */
export async function postExtract(
	itauFileContent: string[][],
	i: number,
	iteration: number,
	conceptsNumberAndDebitOrCredit: {
		ConceptNumber: number
		Debit: number
		Credit: number
	}[]
) {
	let options: {
		request: {
			method: string
			url: string
			headers: { Authorization: string; 'Content-Type': string }
			body: string
		}
		error: string | unknown | null
	} = await createRequestOptions(
		itauFileContent,
		i,
		iteration,
		conceptsNumberAndDebitOrCredit
	)

	if (options.error === null) {
		try {
			return await new Promise((resolve, reject) => {
				request(options.request, function (error, response) {
					if (error) {
						sendErrorMail({
							where: 'postExtract.ts',
							error: error,
						}).then(() => reject(error))
					}
					if (JSON.parse(response.body).ok === false) {
						sendErrorMail(
							JSON.stringify({
								Options: JSON.parse(options.request.body).json,
								Error: JSON.parse(response.body).error,
							})
						).then(() =>
							reject({
								error: JSON.parse(response.body).error,
								data: null,
							})
						)
					} else {
						resolve({
							error: null,
							data: {
								RequestOk: JSON.parse(response.body).ok,
								NewId: JSON.parse(response.body).newId,
								Options: JSON.parse(options.request.body).json,
								Response: JSON.parse(response.body).parameter,
							},
						})
					}
				})
			})
		} catch (error) {
			await sendErrorMail({
				where: 'postExtracts.ts',
				error: Error,
			})
			return {
				error: error,
				data: null,
			}
		}
	} else {
		await sendErrorMail({
			where: 'postExtracts.ts',
			error: `Transfer skipped: ${options.error}`,
		})
		return {
			error: options.error,
			data: null,
		}
	}
}
