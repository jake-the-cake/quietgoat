const GLOBALS = {
		activeIndex: 0
}

function useToggleActiveElements(containerId: string) {
		const navList = document.getElementById(containerId)!;
		const navLinks = Array.from(navList.getElementsByTagName('a'));

		// Set up unique IDs and styles for li and a elements
		navLinks.forEach((link, index) => {
			const li = link.parentElement!;
			const defaultWidth = link.offsetWidth + 32 + 'px'
			li.id = `navlinkli${index}`;
			link.id = `navlinka${index}`;
			li.style.width = defaultWidth;
			li.style.height = `${link.offsetHeight}px`;
			li.style.overflow = 'hidden';
			li.style.display = 'flex'
			li.style.position = 'relative';
			link.style.right = '1rem';
			link.style.position = 'absolute';

			// Create an array of link objects
			const linkObject = {
				href: link.getAttribute('href'),
				label: link.textContent,
				blob: link.getAttribute('data-blob'), // Add 'data-blob' attribute if needed
				index: index,
				active: false,
				defaultWidth: defaultWidth
			};

			// Add click event listeners to handle sliding animations
			link.addEventListener('click', (e) => {
				// e.preventDefault();
				toggleLinkVisibility(linkObject);
				toggleLinkVisibility(linkObjectArray[GLOBALS.activeIndex])
				GLOBALS.activeIndex = linkObject.index
			});

		linkObjectArray.push(linkObject);
		});

		// Check for the active index based on the current window.location.pathname
		const currentPathname = window.location.pathname;
		const activeIndex = linkObjectArray.findIndex(link => link.href === currentPathname);
		// Slide the active link open
		if (activeIndex >= 0) {
			// linkObjectArray[activeIndex].active = true
			toggleLinkVisibility(linkObjectArray[activeIndex]);
		}
}

const linkObjectArray: any[] = [];

function toggleLinkVisibility(linkObject: any) {
	const li = document.getElementById(`navlinkli${linkObject.index}`)!;
	const link = document.getElementById(`navlinka${linkObject.index}`);

	if (!linkObject.active) {
		// Slide down to 0px width
		li.style.width = '0px';
	} else {
		// Slide open to the original width
		li.style.width = linkObject.defaultWidth;
	}

	linkObject.active = !linkObject.active;
}

function parseIntAsNumber(targetId: any) {
	// Use a regular expression to match numerical digits in the string
	const digitsArray = targetId.match(/\d+/g);

	// Join the matched digits together and convert to a number
	if (digitsArray && digitsArray.length > 0) {
			const digitsString = digitsArray.join('');
			const numericValue = parseInt(digitsString, 10); // Use parseInt to convert to a number
			return numericValue;
	} else {
			return null; // Return null if no digits are found
	}
}

export { useToggleActiveElements }

// Call the setup function when the DOM is ready
// window.addEventListener('DOMContentLoaded', setupNavigation);