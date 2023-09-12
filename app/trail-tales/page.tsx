'use client'
import React from 'react'
import Feed from '../_components/Feed'
import { CONFIG } from '../_config'

function Page () {

	return (
		<Feed
			category={ CONFIG.navlinks[1] }
		/>
	)
}

export default Page