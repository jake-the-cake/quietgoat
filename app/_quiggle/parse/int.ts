function parseIntAsNumber(value: string) {

	const digitsArray = value.match(/\d+/g);

	if (digitsArray && digitsArray.length > 0) {

		const digitsString = digitsArray.join('');
		const numericValue = parseInt(digitsString, 10);
		return numericValue;
	} else {
		return null;
	}
}

function removeTailingInt(value: string): string {
	const characters = value.split('')
	for (let i = characters.length - 1; i >= 0; i--) {
		if (Number(characters[i]) * 0 === 0) characters.pop()
		else return characters.join('')
	}
	return value
}

export {
	parseIntAsNumber,
	removeTailingInt
}