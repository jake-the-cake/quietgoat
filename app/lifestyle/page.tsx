'use client'
import React, { useEffect } from 'react'
import { Post } from '../_components/Post'

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
	const response = await fetch('http://127.0.0.1:3000/api/entries/read-all', {
		cache: 'no-cache'
	})
	const data = await response.json()
	const posts = await data.filter((post: any) => post.category === window.location.pathname)
	return posts
}

export default Page