function parseIntAsNumber(targetId: string) {

	const digitsArray = targetId.match(/\d+/g);

	if (digitsArray && digitsArray.length > 0) {

		const digitsString = digitsArray.join('');
		const numericValue = parseInt(digitsString, 10);
		return numericValue;
	} else {
		return null;
	}
}

export {
	parseIntAsNumber
}