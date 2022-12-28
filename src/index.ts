import { downloadItauFile } from './services/downloadItauFile'
import { CronJob } from 'cron'

console.info({
	info: 'RPA initialized',
	date: new Date().toLocaleString('es-ES').toString(),
})

// All fridays at 18 = '0 21 * * FRI' + 3 hours for the server times
new CronJob('0 21 * * FRI', function () {
	console.info({
		info: 'Executing cron: MailAmericas SRL.',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	downloadItauFile(1)
}).start()

new CronJob('0 22 * * FRI', function () {
	console.info({
		info: 'Executing cron: MailAmericas S.A. EUR',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	downloadItauFile(2)
}).start()

new CronJob('0 23 * * FRI', function () {
	console.info({
		info: 'Executing cron: MailAmericas S.A. USD',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	downloadItauFile(3)
}).start()

new CronJob('59 23 * * FRI', function () {
	console.info({
		info: 'Executing cron: Postal & Parcel MailAmericas INC',
		date: new Date().toLocaleString('es-ES').toString(),
	})
	downloadItauFile(4)
}).start()
