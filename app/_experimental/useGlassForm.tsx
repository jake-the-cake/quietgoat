import React from 'react'
import { basicErrorLog } from './errors'

export enum FormElementType {
	pickOne = 'radio',
	pickMany = 'checkbox',
	inputLine = 'input',
	inputBlock = 'textarea',
	button = 'button'
}

interface FormElementDetails {
	label: string
	value: string
}

interface FormElement {
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

interface FormSection {
	label: string
	isOptional?: boolean
	collapsedMessage?: string
	headerElements?: (FormElement | string)[]
	elements: (FormElement | Partial<FormElement> | string)[]
}

interface IGlassForm {
	sections: FormSection[]
}

function GlassFormElement({ element }: { element: FormElement }) {
	console.log(element)
	switch (element.type) {
		case undefined:
			return <div className='form-section__content text-dark m-auto'>{ element.justText }</div>
		case FormElementType.pickOne:
			console.log(element.options)
			return <div className='form-section__content text-dark flex justify-between relative'>
 				{
						element.options?.map((entryType, i) => {
							const idKey = `entry-selector-${ i }`
							return (
								 <div
									className='m-auto flex gap-1 cat-selector__radio' 
									key={ idKey }
									id={ idKey }
								>
									{ entryType?.text ?? 'hi' }
								</div>
							 )
						}) ?? <div className='text-dark'>oops</div>
					}
				</div>
	}
}

function GlassFormSection({ section }: { section: FormSection } ) {
	const sectionElements: any[] = []
	const errorLog: any[] = []
	if (section.isOptional) section.label += ' (Optional)'
	section.elements.forEach((element, i) => {
		if (typeof element === 'string') section.elements[i] = { justText: element }
	})

	return (
		<div
			className="flex flex-col gap-1 form-section__container"
		>
			<div className="w-full form-section__header">
				{ section.label }
			</div>
			{
				section.elements.map((element, i) => 
					<GlassFormElement
						key={ section.label + i }
						element={ element as any }
					/>
				) 
			}
		</div>
	)
}

function GlassForm({ sections }: IGlassForm): React.JSX.Element {
	const formSections: any[] = []
	const errorLog: any[] = []
	sections.forEach((section) => {
		if (!section.label) errorLog.push(new SyntaxError('You must provide a section label.'))
		if ((!section.elements || !Array.isArray(section.elements)) || (section.elements as []).length === 0) errorLog.push(new SyntaxError('Section must include at least one element as an array.'))
		if (section.isOptional) console.log('optional')
		if (errorLog.length > 0) errorLog.forEach((error) => {
			basicErrorLog(error)
		})
		else formSections.push(section)
	})

	return (
		<div className='card__container--full'>
			<form className='flex flex-col gap-6' id="new-post-form">
				{
					formSections.map((section, i) =>	
						<GlassFormSection
							key={ section.label + i }
							section={ section }
						/>
					)
				}
			</form>
		</div>
	)
}

export default GlassForm