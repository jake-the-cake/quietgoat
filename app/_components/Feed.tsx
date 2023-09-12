'use client'
import React from 'react'
import { IPost, Post } from './Post'
import { populateByCategory } from '../viewpoints/page'

interface EntryFeedProps {
	category?: NavLinkInfo
	filter?: {
		sortOrder?: {
			by: string
			in: string
		}[]
		pageLength?: number
	}
}

async function Feed ({ category, filter }: EntryFeedProps) {	
	const categoryHref = category?.href && category.href !== '/' ? category.href : null
	const posts = await populateByCategory(categoryHref)
	
	const Category = () => category?.text
		?	<div className="m-auto flex justify-between w-content items-end gap-10">
				<h2 className="text-light text-xl font-bold small-caps">
					{ category.text }
				</h2>
				<span className="text-dark italic text-shadow-light text-sm text-right">
					{ category.blob}
				</span>
			</div>
		: <></>

	return (
		<main className='flex flex-col gap-4'>
			<Category />
				<div className='flex flex-col-reverse gap-4'>
					{ posts.map((post: IPost, i: number) => (
						<Post
							key={`feed-entry-${ i }`}
							post={ post }
							preview={ true }
						/>
					)) }
				</div>
		</main>
	)
}

export default Feed