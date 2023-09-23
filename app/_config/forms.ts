import { FormElement, FormElementType, FormSection } from "../_types/forms";
import { navlinks } from "./navlinks";

const elements: {[key: string]: FormElement} = {
	category: {
		type: FormElementType.pickOne,
		id: 'category',
		options: navlinks.slice(1) as any
	},
	title: {
		type: FormElementType.inputLine,
		id: 'title',
		defaultValue: 'Entry Title (required)',
		details: {
			variant: 'h2'
		}
	},
	caption: {
		type: FormElementType.inputLine,
		id: 'caption',
		defaultValue: 'Add a caption',
		details: {
			variant: 'h3'
		}
	}
}

const sections = {

}

const defaults = {
	placeholder: 'Enter text...'
}

const forms = {
	elements,
	sections,
	defaults
}

export default forms