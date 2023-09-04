// interface SvgOptions {
// 	PRIMARY?: string
// 	ACCENT?: string
// }

// const svgOptions: SvgOptions = {
// 	PRIMARY: undefined,
// 	ACCENT: undefined
// }

// async function useSvg(url: string, container: HTMLElement, options?: SvgOptions) {
// 	const response = await fetch(url, {
// 		method: 'GET',
// 		headers : {
//       'Access-Control-Allow-Origin': '*',
//       // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 			'Content-Type': 'application/json'
// 		}}
// 	)
// 	// .then((response) => response.text())
// 	const data = await response.text()
// 	// .then((data) => {
// 	// 	Object.entries({...svgOptions, ...options}).forEach(([key, value]) => {
// 	// 		data = data.replace(key, value as string ?? `hsl(var(--${key.toLowerCase()}))`)
// 	// 	})
// 	// 	container?.insertAdjacentHTML('afterbegin', data)			
// 	// })
// }

// export {
// 	useSvg
// }