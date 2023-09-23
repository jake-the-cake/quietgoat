'use client'

import GlassForm from '@/app/_components/GlassForm'
import { CONFIG } from '@/app/_config'
import { useFormSubmission } from '@/app/_experimental/useApi'
import { parseIntAsNumber } from '@/app/_quiggle/parse/int'
import { useToggleActiveElements } from '@/app/_quiggle/useToggleActiveElement'
import { FormElementType } from '@/app/_types/forms'
import React, { MouseEvent, PointerEvent } from 'react'

interface FormDataProps {
	selectedIndex: null | number
}

const Page = ({}) => {
	useToggleActiveElements('link-container')

	const sections = [
		{
			label: 'Select Entry Category',
			elements: [ CONFIG.forms.elements.category ]
		},
		{
			label: 'Additional Information',
			isOptional: true,
			elements: ['']
		},
		{
			label: 'Tell Your Story',
			elements: [
				CONFIG.forms.elements.title,
				CONFIG.forms.elements.caption
			]
		}
	]

	return (
		<GlassForm
			sections={ sections }
		/>
	)
}





	// const formData: FormDataProps = {
	// 	selectedIndex: null
	// }
	// const entryTypes = CONFIG.navlinks.slice(1)
	
	// function handleSelectedItem(e: MouseEvent<HTMLDivElement>) {
	// 	const selectorInput = document.getElementById('category-selection') as HTMLInputElement

	// 	const target = e.target as HTMLDivElement
	// 	if (target.classList.contains('form-section__content')) return
		
	// 	const selectedIndex = parseIntAsNumber(target.id)!
	// 	const options: Element[] = Array.from(target.parentNode!.children)
	// 	const className = 'selected-cat'
		
	// 	if (formData.selectedIndex === selectedIndex) {
	// 		formData.selectedIndex = null
	// 		target.classList.remove(className)
	// 	}
	// 	else {
	// 		formData.selectedIndex = selectedIndex
	// 		target.classList.add(className)
	// 		selectorInput.value = '/' + target.textContent?.split(' ').join('-').toLowerCase()!
	// 	}

	// 	options.forEach(option => {
	// 		option.classList.remove('text-grey')
	// 		if (parseIntAsNumber(option.id) !== selectedIndex) {
	// 			option.classList.remove(className)
	// 			if (formData.selectedIndex !== null) option.classList.add('text-grey')
	// 		}
	// 	})
	// }
	// const placeholder = {
	// 	title: 'Add A Title',
	// 	caption: 'Use an optional caption...'
	// }
		
	// <div
	// 	className='card__container--full'
	// >
	// 	<form className='flex flex-col gap-6' onSubmit={ useFormSubmission('/blog-entry', 'POST') } id="new-post-form">
	// 		<h1 className='text-3xl text-primary font-bold'>New Blog Entry</h1>
	// 		<div
	// 			className="flex flex-col gap-1 form-section__container"
	// 			onClick={ handleSelectedItem }
	// 		>
	// 			<div className="w-full form-section__header">
	// 				Select Entry Category
	// 			</div>
	// 			<div className='form-section__content text-dark flex justify-between relative'>
	// 				{
	// 					entryTypes.map((entryType, i) => {
	// 						const idKey = `entry-selector-${ i }`
	// 						return (
	// 							 <div
	// 								className='m-auto flex gap-1 cat-selector__radio' 
	// 								key={ idKey }
	// 								id={ idKey }
	// 							>
	// 								{ entryType.text }
	// 							</div>
	// 						 )
	// 					})
	// 				}
	// 			</div>
	// 		</div>
	// 		<div
	// 			className="flex flex-col gap-1 form-section__container"
	// 		>
	// 			<div className="w-full form-section__header">
	// 				Meta Details (Optional)
	// 			</div>
	// 			<div className='form-section__content text-dark flex justify-between relative'>
	// 				This will be location, date, people, etc.
	// 			</div>
	// 		</div>
	// 		<div
	// 			className="flex flex-col gap-1 form-section__container"
	// 		>
	// 			<div className="w-full form-section__header">
	// 				Tell your story
	// 			</div>
	// 			<div className='form-section__content text-dark flex flex-col gap-5 relative'>


	// 				<div className="entry-form__actions">
	// 					<span onClick={ () => window.history.back() }>Cancel</span>
	// 					<button id="save-draft" className='btn btn__primary--outline'>Save Draft</button>
	// 					<button id="create-entry" className='btn btn__primary'>Submit</button>
	// 				</div>

	// 				<GlassElement
	// 					id='new-entry-title'
	// 					type='h2'
	// 					options={{
	// 						placeholder: placeholder.title,
	// 						onClick: handleMakeInputActive(placeholder.title)
	// 					}}
	// 				/>

	// 				<GlassElement
	// 					id='new-entry-caption'
	// 					type='h3'
	// 					options={{
	// 						placeholder: placeholder.caption,
	// 						onClick: handleMakeInputActive(placeholder.caption)
	// 					}}
	// 				/>

	// 				<GlassElement
	// 					id='new-entry-story'
	// 					type='blob'
	// 					options={{
	// 						onClick: handleMakeInputActive()
	// 					}}
	// 				/>

	// 				{/* <div className="entry-form__input--row items-center flex flex-col gap-5">
	// 					<textarea className='entry-form__input w-full' rows={ 20 } name='story' id='entry-story' />
	// 				</div> */}
	// 			</div>
				
	// 		</div>
	// 		<input type="hidden" name="category" id='category-selection' />
	// 	</form>
	// </div>

type ClickedDiv = PointerEvent<HTMLDivElement>

interface GlassElementProps {
	id: string
	type: string
	options?: {
		placeholder?: string
		onClick?: (event: ClickedDiv) => void
	}
}

export default Page