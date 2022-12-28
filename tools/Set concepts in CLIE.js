// @ts-nocheck
/* eslint-disable quotes */
let empresas = GetInstancesOf('CLIENTE', "DESC_ESTADO = 'Ingresada'")

for (let empresa in empresas) {
	let conceptos = GetInstancesOf(
		'CONCEPTOS',
		"CONC_CONCEPTOS LIKE '%" + empresas[empresa].NOMBRE.toString() + "%'"
	)

	if (conceptos.length > 0) {
		empresas[empresa].CONC_ID_CONC = conceptos[0].id
		SaveInstance(empresas[empresa])
		LogPrint(empresas[empresa].NOMBRE)
	}
}
