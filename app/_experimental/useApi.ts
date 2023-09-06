import { ApiError } from "next/dist/server/api-utils"
import { FormEvent } from "react"
import { basicErrorLog } from "./errors"

function useFormSubmission(url: string, method: string) {
	return async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		const formData: {[key: string]: any} = {}

		try {
			const form = new FormData(event.target as any)
			console.log(form)
			Array.from(form.entries()).forEach((entry) => {
				const [key, value]: [key: string, value: FormDataEntryValue] = entry
				formData[key] = value.toString()
			})

			// const formData = JSON.stringify(Object.fromEntries(form.entries()))
			const response = await fetch('http://127.0.0.1:3000/api' + url, {
				method: method,
				mode: 'cors',
				headers: {
						"Content-Type": "application/json",
						'Access-Control-Allow-Headers': '*'
				},
				body: JSON.stringify(formData)
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