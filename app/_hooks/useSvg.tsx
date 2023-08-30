interface SvgOptions {
	PRIMARY?: string
	ACCENT?: string
}

const svgOptions: SvgOptions = {
	PRIMARY: undefined,
	ACCENT: undefined
}

async function useSvg(url: string, container: HTMLElement, options?: SvgOptions) {
	return await fetch('http://localhost:3000/assets/qg.svg')
	.then((response) => response.text())
	.then((data) => {
		Object.entries({...svgOptions, ...options}).forEach(([key, value]) => {
			data = data.replace(key, value as string ?? `hsl(var(--${key.toLowerCase()}))`)
		})
		container?.insertAdjacentHTML('afterbegin', data)			
	})
}

export {
	useSvg
}