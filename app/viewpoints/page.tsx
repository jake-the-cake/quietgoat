'use client'
import React from 'react'
import { useGetJsonData } from '../_experimental/api'
import Feed from '../_components/Feed'
import { CONFIG } from '../_config'

async function Page () {

	return (
		<Feed
			category={ CONFIG.navlinks[4] }
		/>
	)
}

export async function populateByCategory(href?: string | null) {
	let data = await useGetJsonData('/api/entries/read-all', {})
	if (href) data = await data.filter((post: any) => post.category === href)
	return data
}

export default Page