'use client'

import GlassForm from '@/app/_components/GlassForm'
import { CONFIG } from '@/app/_config'
import { useToggleActiveElements } from '@/app/_quiggle/useToggleActiveElement'
import React, { PointerEvent } from 'react'

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
				CONFIG.forms.elements.caption,
				CONFIG.forms.elements.story
			]
		}
	]
	
	return (
		<GlassForm
			sections={ sections }
			formTitle='New Blog Entry'
		/>
	)
}

type ClickedDiv = PointerEvent<HTMLDivElement>

// interface GlassElementProps {
// 	id: string
// 	type: string
// 	options?: {
// 		placeholder?: string
// 		onClick?: (event: ClickedDiv) => void
// 	}
// }

export default Page