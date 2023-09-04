function basicErrorLog(error: any, kill?: true): void {
	console.error(error.name, error.message)
	console.warn(error.stack)
	if (kill === true) throw error
}

export {
	basicErrorLog
}