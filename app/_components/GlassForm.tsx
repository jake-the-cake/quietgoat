import React, { useEffect } from 'react'
import { ClickedDiv, FormElement, FormElementType, FormSection, IGlassForm } from '../_types/forms'
import { basicErrorLog } from '../_experimental/errors'
import { CONFIG } from '../_config'

function GlassFormSingleSelector({ element }: { element: FormElement }) {
	const id = {
		selector: 'single-selector' + element.id,
		option: 'ss-option-' + element.id + '-'
	}
	return (
		<div
			className='form-section__content text-dark flex justify-between relative'
			id={ id.selector }
			>
			{
				element.options?.map((entryType, i) => {
					const idKey = id.option + i
					return (
						<div
							className='m-auto cat-selector__radio' 
							key={ idKey }
							id={ idKey }
							tabIndex={0}								
						>
							{ entryType?.label ?? 'hi' }
						</div>
					)
				})
			}
		</div>
	)
}

function handleMakeInputActive (placeholder: string = CONFIG.forms.defaults.placeholder) {
	return (event: ClickedDiv) => {
		const target = event.target as HTMLDivElement
		target.contentEditable = 'true'
		target.focus()
		if (target.textContent === placeholder) target.textContent = ''
		target.addEventListener('focusout', () => {
			if (target.textContent === '') target.textContent = placeholder
		})
	}
}

function GlassFormInputLine({ element }: { element: FormElement }) {
	const id = 'input-line-' + element.id
	if (!element.defaultValue) element.defaultValue = CONFIG.forms.defaults.placeholder

	const controller = new AbortController()
	useEffect(() => {
		if (!document) return controller.abort()
		const input = document.getElementById(id)
		if (!input) return controller.abort()
		input.addEventListener('keypress', (event) => {
			const tabs: HTMLElement[] = Array.from(document.querySelectorAll('[tabindex]'))
			const nextTab: HTMLElement = tabs[tabs.indexOf(tabs.filter(tab => tab.id === input.id)[0]) + 1]
			if (event.key === 'Enter') {
				event.preventDefault();
				if (nextTab) nextTab.focus()
			}
		})
		return controller.abort()
	}, [])

	return (
		<div
			className='form-section__content'
		>
			<div
				id={ id }
				className={`glass__input glass__input--${ element.details?.variant ?? ''}`}
				onClick={ handleMakeInputActive(element.defaultValue) }
				//@ts-ignore
				onFocus={ handleMakeInputActive(element.defaultValue) }
				tabIndex={0}
			>
					{ element.defaultValue }
			</div>
		</div>
	)
}

function GlassFormElement({ element }: { element: FormElement }) {
	switch (element.type) {
		case undefined:
			return (
				<div
					className='form-section__content text-dark m-auto'
				>
					{ element.justText }
				</div>
			)
		case FormElementType.pickOne:
			return (
				<GlassFormSingleSelector
					element={ element }
				/>
			)
		case FormElementType.inputLine:
			return (
				<GlassFormInputLine
					element={ element }
				/>
			)
	}
}

function GlassFormSection({ section }: { section: FormSection } ) {
	const sectionElements: any[] = []
	const errorLog: any[] = []
	if (section.isOptional) section.label += ' (Optional)'
	section.elements.forEach((element, i) => {
		if (typeof element === 'string') section.elements[i] = { justText: element }

		// add error checking

		sectionElements.push(element)
	})

	return (
		<div
			className="flex flex-col gap-1 form-section__container"
		>
			<div className="w-full form-section__header">
				{ section.label }
			</div>
			{
				sectionElements.map((element, i) => 
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