import React, { MouseEvent, MouseEventHandler, PointerEvent, useEffect } from 'react'
import { ClickedDiv, FormElement, FormElementType, FormSection, IGlassForm } from '../_types/forms'
import { basicErrorLog } from '../_experimental/errors'
import { CONFIG } from '../_config'
import { parseIntAsNumber, removeTailingInt } from '../_quiggle/parse/int'
import { useFormSubmission } from '../_experimental/useApi'

interface FormDataProps {
	selectedIndex: null | number
}

const formData: FormDataProps = {
	selectedIndex: null
}

function handleSelectedItem(e: MouseEvent<HTMLDivElement>) {
	const selectorInput = document.getElementById('single-selector-category-input') as HTMLInputElement

	const target = e.target as HTMLDivElement
	if (target.classList.contains('form-section__content')) return
	
	const selectedIndex = parseIntAsNumber(target.id)!
	const options: Element[] = Array.from(target.parentNode!.children)
	const className = 'selected-cat'
	
	if (formData.selectedIndex === selectedIndex) {
		formData.selectedIndex = null
		target.classList.remove(className)
		target.blur()
		selectorInput.value = ''
	}
	else {
		formData.selectedIndex = selectedIndex
		target.classList.add(className)
		selectorInput.value = '/' + target.textContent?.split(' ').join('-').toLowerCase()!
	}
	options.forEach(option => {
		option.classList.remove('text-grey')
		if (parseIntAsNumber(option.id) !== selectedIndex) {
			option.classList.remove(className)
			if (formData.selectedIndex !== null) option.classList.add('text-grey')
		}
	})
}

function handleKeyboardSelect(event: PointerEvent<HTMLDivElement>) {
	const target = event.target as HTMLDivElement
	
	function selectWithKeys(event: KeyboardEvent) {
		const { keyCode, code, key } = event
		if (keyCode === 37 || keyCode === 39) {
			const target = event.target as HTMLDivElement
			const id: string = removeTailingInt(target.id)
			let count: number | null = 0
			const options = []
			while (typeof count === 'number') {
				const option = document.getElementById(id + count)
				if (!option) count = null
				else {
					options.push(option)
					count++
				}
			}
			count = parseIntAsNumber(target.id) || 0
			switch (keyCode) {
				case 37:
					count = count - 2
				case 39:
					count!++
				default:
					if (count === -1) count = options.length - 1
					if (count === options.length) count = 0
					options[count!].focus()
			}
		}
		if (key === 'Enter' || key === ' ') {
			event.preventDefault()
			target.click()
			target.focus()
		}
	}
	target.addEventListener('keydown', selectWithKeys)
	target.addEventListener('focusout', () => {
		target.removeEventListener('keypress', selectWithKeys	)
	})
}

function GlassFormSingleSelector({ element }: { element: FormElement }) {
	const id = {
		selector: 'single-selector-' + element.id,
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
							//@ts-ignore
							onFocus={ handleKeyboardSelect }
							onClick={ handleSelectedItem }
							tabIndex={0}
						>
							{ entryType?.label ?? 'hi' }
						</div>
					)
				})
			}
			<input type="hidden" id={ id.selector + '-input' } />
		</div>
	)
}

interface FormFocusOptions {
	noScroll?: boolean
}

function setFormFocus( elementId: string, options?: FormFocusOptions ) {
	return () => {
		const element = document.getElementById(elementId)
		if (!element) return
		const scrollPosition = element.getBoundingClientRect().top + window.scrollY - 150;
		element.focus()
		if (options?.noScroll !== true) window.scrollTo({ top: scrollPosition, behavior: 'smooth'})
	}
}

function handleMakeInputActive(placeholder: string = CONFIG.forms.defaults.placeholder) {
	return (event: ClickedDiv) => {
		const target = event.target as HTMLDivElement
		const focus = setFormFocus(target.id)
		target.contentEditable = 'true'
		if (target.textContent === placeholder) target.textContent = '';
		focus!()
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

function GlassFormInputBlock({ element }: { element: FormElement }) {
	const id = 'input-block-' + element.id
	if (!element.defaultValue) element.defaultValue = CONFIG.forms.defaults.placeholder

	return (
		<div
			className='form-section__content'
		>
			<div
				id={ id }
				className={`glass__input glass__input--blob`}
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
		case FormElementType.inputBlock:
			return (
				<GlassFormInputBlock
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

function GlassForm({ sections, formTitle }: IGlassForm): React.JSX.Element {
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

	const title = formTitle
		?	<h1 className='text-3xl text-primary font-bold mb-6'>
				{ formTitle }
			</h1>
		: null

	return (
		<div className='card__container--full'>
			{	title	}
			<form className='flex flex-col gap-6' id="new-post-form">
				{
					formSections.map((section, i) =>	
						<GlassFormSection
							key={ section.label + i }
							section={ section }
						/>
					)
				}
				<div className="entry-form__actions">
					
					{ /* Cancel button */}
					<span
						onClick={ () => window.history.back() }
						tabIndex={0}
					>Cancel</span>

					{ /* Save Draft button */}
					<button
						id="save-draft"
						className='btn btn__primary--outline'
					>Save Draft</button>
					
					{ /* Submit button */}
					<button
						id="create-entry"
						className='btn btn__primary'
						onClick={ handleSubmitEntry }
					>Submit</button>

				</div>
			</form>
		</div>
	)
}

function handleSubmitEntry(event: MouseEvent<HTMLButtonElement>) {
	event.preventDefault()
	const category = (document.getElementById('single-selector-category-input') as HTMLInputElement)?.value ?? null
	console.log(category)

	const data = {
		// category: (document.getElementById('single-selector-category-input') as HTMLInputElement).value,
		category,
		title: (document.getElementById('input-line-title') as HTMLDivElement).innerText,
		caption: (document.getElementById('input-line-caption') as HTMLDivElement).innerText,
		story: (document.getElementById('input-block-story') as HTMLDivElement).innerHTML,
	}
	if (!data.category) console.log('no category') //return
	if (!category) console.warn('category required') //return
	fetch(CONFIG.db.uri + '/api/blog-entry', {
		method: 'POST',
		mode: 'cors',
		headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*'
		},
		body: JSON.stringify(data)
	}).then(response => response.json()).then(data => {
		console.log(data)
	}).catch(err => console.log(err))
}


export default GlassForm