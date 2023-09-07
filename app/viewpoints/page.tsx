'use client'
import React, { useEffect } from 'react'
import { Post } from '../_components/Post'
import { CONFIG } from '../_config'
import { useGetJsonData } from '../_experimental/api'
import { useToggleActiveElements } from '../_quiggle/useToggleActiveElement'

async function Page () {
	// let posts: any[] = []
	let posts: any[] = await populateByCategory()

	// useEffect(() => {
		// posts = populateByCategory()
	// }, [])

	return (
		<main className='flex flex-col-reverse gap-4'>
      {
				posts.map((post: any, i: number) => (
					<Post
						key={`feed-entry-${ i }`}
						post={ post }
						preview={ true }
          />
					
					))
				}
    </main>
	)
}

export async function populateByCategory() {
	// const response = await fetch(CONFIG.db.uri + '/api/entries/read-all')
	// = await response.json()
	// useToggleActiveElements('link-container')

	const data = await useGetJsonData('/api/entries/read-all', {})
	const posts = await data.filter((post: any) => post.category === window.location.pathname)
	return posts
}

export default Page