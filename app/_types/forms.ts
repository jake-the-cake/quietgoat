import { PointerEvent } from "react"

export enum FormElementType {
	pickOne = 'radio',
	pickMany = 'checkbox',
	inputLine = 'input',
	inputBlock = 'textarea',
	button = 'button'
}

export interface FormElementDetails {
	label?: string
	value?: string
	variant?: string
}

export type ClickedDiv = PointerEvent<HTMLDivElement>

export interface FormElement {
	justText?: string
	isOptional?: boolean
	defaultValue?: string
	type: FormElementType
	details?: FormElementDetails
	options?: FormElementDetails[]
	id: string
	size?: string
	decoration?: string | string[]
	validation?: (checks: {[key: string]: any}) => boolean
}

export interface FormSection {
	label: string
	isOptional?: boolean
	collapsedMessage?: string
	headerElements?: (FormElement | string)[]
	elements: (FormElement | Partial<FormElement> | string)[]
}

export interface IGlassForm {
	sections: FormSection[]
}