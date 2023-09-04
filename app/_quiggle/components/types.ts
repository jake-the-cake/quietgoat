enum ToggleType {
  link = 'a',
  image = 'img'
}

interface ToggleActiveElementProps {
  elementType: ToggleType
  containerId: string
  classList?: string | string[]
  elementData: NavLinkInfo[]
}

interface ToggleElementProps {
  element: NavLinkInfo
  elementType: ToggleType
}