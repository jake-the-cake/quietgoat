interface NavLinkInfo {
  href?: string
  src?: string
  label?: string
  blob?: string
}

interface NavLinkProps {
	link: NavLinkInfo
	index: number
}

interface NavLinksProps {
  links: NavLinkInfo[]
  active: number
}