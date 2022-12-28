import sql, { config } from 'mssql'
import { sendErrorMail } from '../utils/nodemailer'
require('dotenv').config()

const dbSettings: config = {
	server: process.env.YIQI_DATABASE_SERVER as string,
	user: process.env.YIQI_DATABASE_USER,
	password: process.env.YIQI_DATABASE_PASSWORD,
	database: 'MailAmericas',
	connectionTimeout: 600000,
	requestTimeout: 600000,
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
}

export async function getConnection(): Promise<sql.ConnectionPool | false> {
	try {
		return sql.connect(dbSettings)
	} catch (error) {
		await sendErrorMail({
			where: 'connections.ts',
			error: `MSSQL connection error: ${error}`,
		})
		return false
	}
}
