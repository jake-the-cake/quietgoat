interface NavLinkObject {

}

interface NavLinkInfo {
  href: string
  label: string
  blob?: string
	isActive?: true
}

interface NavLinkProps {
	link: NavLinkInfo
	index: number
}

interface NavLinksProps {
  links: NavLinkInfo[]
  active: number
}