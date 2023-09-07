const db = {
	uri: process.env.SERVER_BASE_URI || `http://localhost:${
		process.env.SERVER_DEFAULT_PORT || '3000'
	}`,
	name: 'QuiggleBlog'
}

export {
	db
}