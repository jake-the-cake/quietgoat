'use client'
import React, { useEffect } from 'react'
import { Post } from '../_components/Post'
import { populateByCategory } from '../viewpoints/page'

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

export default Page