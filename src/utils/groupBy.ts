export function groupBy(collection: string | any[], property: string): any[][] {
	var i = 0,
		val,
		index,
		values = [],
		result = []
	for (; i < collection.length; i++) {
		val = collection[i][property]
		index = values.indexOf(val)
		if (index > -1) result[index].push(collection[i])
		else {
			values.push(val)
			result.push([collection[i]])
		}
	}
	return result
}
