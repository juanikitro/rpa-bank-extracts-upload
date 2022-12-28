// V8
function runScript() {
	const fechaAnterior = new Date(current.FECHA - 1)
	const fechaAnteriorFormateada = fechaAnterior.toLocaleDateString('en-US')

	LogPrint(`current.FECHA: ${current.FECHA}`)
	LogPrint(`current.CUCO_ID_CUCO: ${current.CUCO_ID_CUCO}`)
	LogPrint(`fechaAnteriorFormateada: ${fechaAnteriorFormateada}`)

	const sql = `SELECT TOP 1 EXTR_ID, EXTR_SALDO, CUCO_ID_CUCO, EXTR_FECHA FROM ENT_EXTRACTO WHERE CAST(EXTR_FECHA AS DATE) <= '${fechaAnteriorFormateada} AND CUCO_ID_CUCO = ${current.CUCO_ID_CUCO} GROUP BY EXTR_FECHA, EXTR_ID, EXTR_SALDO, CUCO_ID_CUCO ORDER BY EXTR_FECHA DESC, EXTR_ID DESC `
	const query = ExecuteSQL(sql)[0]

	if (query) {
		LogPrint(query)
		current.SALDO = query.EXTR_SALDO
		SaveInstance(current)
	} else {
		LogPrint('query !')
	}
}

if (current && current.CONC_ID_CONC === 711 && current.FECHA) {
	runScript()
}
