'use client'
import React from 'react'
import Feed from '../_components/Feed'
import { CONFIG } from '../_config'

function Page () {

	return (
		<Feed
			category={ CONFIG.navlinks[3] }
		/>
	)
}

export default Page