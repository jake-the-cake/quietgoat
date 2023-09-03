import Link from 'next/link'
import React from 'react'

const Page = () => {
	return (
		<div>
			<Link
				href='/blog/new-entry'
			>
				New Post
			</Link>
		</div>
	)
}

export default Page