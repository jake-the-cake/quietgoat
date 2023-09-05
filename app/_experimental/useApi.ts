import { ApiError } from "next/dist/server/api-utils"
import { FormEvent } from "react"
import { basicErrorLog } from "./errors"

function useFormSubmission(url: string, method: string) {
	return async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = new FormData(event.target as any)
		const params = new URLSearchParams(Object.fromEntries(form.entries() as any))

		try {
			const response = await fetch('http://127.0.0.1:3000/api' + url + '?' + params, {
				method: method,
				mode: 'cors',
				headers: {
						"Content-Type": "application/json",
						'Access-Control-Allow-Headers': '*'
				}
			})
			if (!response.ok) return basicErrorLog(new ApiError(response.status, 'Response was not ok.'))
			const data = await response.json()
			if (data.category) window.location.href = data.category
			return data
		}
		catch (error: any) {
			return basicErrorLog(error)
		}
	}	
}

export {
	useFormSubmission
}