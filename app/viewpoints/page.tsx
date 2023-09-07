'use client'
import React from 'react'
import { Post } from '../_components/Post'
import { useGetJsonData } from '../_experimental/api'

async function Page () {
	let posts: any[] = await populateByCategory()

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
	const data = await useGetJsonData('/api/entries/read-all', {})
	const posts = await data.filter((post: any) => post.category === window.location.pathname)
	return posts
}

export default Page