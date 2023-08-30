'use client'

import { useEffect } from "react"
import { useSvg } from "../_hooks/useSvg"

interface LogoProps {
	id?: string
}

function Logo({id = 'logo'}: LogoProps): JSX.Element {

	useEffect(() => {
		useSvg(
			'http://localhost:3000/assets/qg.svg',
			document.getElementById('logo')!)
	}, [])

	return (
		<div id={id} className='logo'></div>
	)
}

export default Logo