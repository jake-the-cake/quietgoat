'use client'

import React, { useEffect } from 'react'

const Loading = () => {
	const controller = new AbortController()

	useEffect(() => {
		const CONFIG = {
      timerLength: 125,
			light: true,
    }

    function runLoader() {
      const loader: HTMLElement | null = document.getElementById('svg-loader')
			if (!loader) return controller.abort()
      const loadingBars: HTMLElement[] = [...loader.children[2].children as any]
      adjustLoaderBars({ loader, loadingBars })
    }
    
    function adjustLoaderBars({loader, loadingBars, count = loadingBars.length - 1}: any) {
			let color: string = ''
			switch (CONFIG.light) {
				case true:
					color = 'accent'
					break
				default:
					color = 'primary'
			}
      if (count === -1) {
				CONFIG.light = !CONFIG.light
        runLoader()
			}
      else setTimeout(() => {
				const opacity = '.' + (((count + 1) * 2 - 1))
        loadingBars[count].style.fill = `hsl(var(--${color}), ${opacity})`
        adjustLoaderBars({loader, loadingBars, count: count - 1})
      }, CONFIG.timerLength)
    }
    runLoader()
		window.scrollTo(0, 0)
		return controller.abort()
	}, [])

	return (
		<svg id="svg-loader"
			className='flex justify-center w-full'
			xmlns="http://www.w3.org/2000/svg"
			width="200"
			height="200"
			viewBox="0 0 200 200"
			fill="none"
		>
			{/* <!-- Clip Path for Mountain Shape --> */}
			<clipPath id="mountain-clip">
				<path
					d="M28 155 L51 75 L80 109 L110 74 L134 129 L155 103 L172 152 L175 155 L28 155 Z"
				/>
			</clipPath>
		
			{/* <!-- Mountain Shape --> */}
			<path
				d="M25 155 L50 70 L80 105 L110 70 L135 125 L155 100 L175 155 L175 155 L25 155 Z"
				fill="hsl(var(--primary))"
			/>
		
			{/* <!-- Horizontal Bars Clipped to Mountain Shape --> */}
			<g clipPath="url(#mountain-clip)">
				<rect x="25" y="75" width="150" height="18" fill="none" />
				<rect x="25" y="95" width="150" height="18" fill="none" />
				<rect x="25" y="115" width="150" height="18" fill="none" />
				<rect x="25" y="135" width="150" height="18" fill="none" />
			</g>
		</svg>
	)
}

export default Loading