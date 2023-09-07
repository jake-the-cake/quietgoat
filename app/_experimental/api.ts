import { CONFIG } from "../_config"

async function useGetJsonData(url: string, options: any) {
	
	if (options) {
		console.log('options:', options)
	}

	const response = await fetch(CONFIG.db.uri + url)
	const data = await response.json()
	return data
}

export {
	useGetJsonData
}