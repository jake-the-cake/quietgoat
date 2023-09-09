import { ApiError } from "next/dist/server/api-utils"
import { FormEvent } from "react"
import { basicErrorLog } from "./errors"
import { CONFIG } from "../_config"
import { useToggleActiveElements } from "../_quiggle/useToggleActiveElement"

type ValueUnknownVoid = (value: unknown ) => void
type ReasonAnyVoid = (reason?: any) => void

function useFormSubmission(url: string, method: string) {
	return async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const targetForm = event.target as HTMLFormElement
		const formData: {[key: string]: any} = {}
		const formElements = Array.from(targetForm.children[3].children[1].children)



		try {
			const form = new FormData(event.target as any)
			// console.log(form)
			Array.from(form.entries()).forEach((entry) => {
				const [key, value]: [key: string, value: FormDataEntryValue] = entry
				formData[key] = value.toString()
			})
			formElements.forEach((element: any) => {
				const index = element.id.split('-').at(-1)
				let html = element.children[0].innerHTML
				if (html.slice(html.length-4) === '<br>') html = html.slice(0, html.length-4)
				if (index) formData[index] = html
			})
			console.log(formData)

			const response = await fetch(CONFIG.db.uri + '/api' + url, {
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
			if (data.category) {
				new Promise((ok: ValueUnknownVoid, fail: ReasonAnyVoid) => {
					if (
						typeof data.category === 'string'
						&& data.category[0] === '/'
					) ok(data.category)
					else fail(new SyntaxError('Invalid category format.'))
				})
				.then((category: any) => {
					try {
						const links = Array.from(document.getElementById('link-container')!.children)
						links.forEach(parent => {
							const link: HTMLAnchorElement = parent.firstChild as HTMLAnchorElement
							if (link.pathname === category) {
								// @ts-ignore
								link.onclick = useToggleActiveElements('link-container')
								link.click()
							}
						})
					}
					catch (err) { basicErrorLog(err) }
				})
				.catch(basicErrorLog)
			}
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