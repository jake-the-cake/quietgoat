import React from 'react'


function LogoSvg({ id, width }: { id: string, width: string }) {
	return (
		<svg width={ width } id={ id } xmlns="http://www.w3.org/2000/svg" viewBox="13 13 22 25" fill="none">
			<path stroke={'hsl(var(--accent))'} strokeWidth="4" d="M 33 19 L 29 15 L 24 15 L 19 20 L 19 30 L 24 35 L 29 35 L 34 30 L 34 26 L 25 26" />
			<path stroke={'hsl(var(--primary))'} strokeWidth="4" d="M 15 20 L 15 30 L 20 35 L 25 35 L 30 30 L 30 20 L 25 15 L 20 15 Z M 30 35 L 25 30" />
		</svg>
	)
}

export default LogoSvg