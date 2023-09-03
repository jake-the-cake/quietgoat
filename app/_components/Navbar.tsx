'use client'

import React, { EventHandler, MouseEvent, ReactElement, Suspense, useEffect } from 'react'
import { CONFIG } from '../_config'
import Logo from './Logo'
import Link from 'next/link'
import { useToggleActiveElements } from '../_quiggle/useToggleActiveElement'


// class LinkSlider {
//   links: {
//     index: number,
//     Element: () => ReactElement,
//     width: () => number,
//     element: () => HTMLElement
//     parent: () => HTMLElement
//   }[]
//   active: number

//   constructor(links: NavLinkInfo[], active: number) {
//     this.active = active
//     this.links = []
//     links.forEach((link, i) => {
//       this.links.push({
//           Element: () => this.newNavLink(link, i),
//           index: i,
//           width: () => document.getElementById(`navli${i}`)!.offsetWidth,
//           element: () => document.getElementById(`nava${i}`)!,
//           parent: () => this.links[i].element().parentElement!
//        })
//     })
//     console.log(this)
//   }

//   newNavLink(link: NavLinkInfo, i: number): React.JSX.Element {
//     console.log(link)
//     return (
//       <li className="relative" id={`navli${i}`}>
//         <Link 
//           href={link.href}
//           id={`nava${i}`}
//           className={'relative right-0 px-2' + (link.isActive ? ' active' : '')}
//           onClick={this.handleNavLink()}
//         >
//           { link.label }
//         </Link>
//       </li>

//     )
//   }

//   handleNavLink() {
//     return (e: MouseEvent<HTMLAnchorElement>) => {
//       e.preventDefault()
//       const id = (e.target as any).id.replace('nava', '')
//       const activeLink = this.links[this.active]?.element()
//       if (activeLink) {
//         // const scrollRight = activeLink.offsetWidth
//         for (let i = this.active + 1; i < this.links.length; i++) {
//           this.links[i].element().style.right = 0 + 'px'
//         }        
//         this.links[this.active].element().classList.toggle('active')
//       }
//       const scrollLeft = this.links[id].element().offsetWidth
//       console.log(scrollLeft)
//       // const currentPosition = parseInt(this.links[this.active].element().style.right) || 0
//       this.active = id
//       // const scrollLeft = newActiveLink.offsetWidth
//       for (let i = this.active; i < this.links.length; i++) {
//       //   console.log(currentPosition)
//         this.links[i].element().style.right = scrollLeft + 'px'
//       }   
//       // this.links[this.active].element().classList.toggle('active')
//     }
//   }
// }


// function returnActivePageIndex(links: any) {
//   let active
//   const currentPath = links.filter((link: any) => link.href === window.location.pathname)[0]
//   console.log(currentPath)
//   links.forEach((link: any, i: number) => {
//     console.log(currentPath.href, link.href)
//     if (currentPath.href === link.href) active = i
//   })
//   return typeof active === 'number' ? active : -1
// }

// function NavLinks({links}: NavLinksProps) {
//   const active = returnActivePageIndex(links)
//   console.log(active)
//   if (links[active]) links[active].isActive = true

//   const navLinks = new LinkSlider(links, active)


//   useEffect(() => {
//     // navLinks.
//   }, [])

//   return (
//     <ul className='flex'>
//       {
//         navLinks.links.map((SliderLink, i) => <SliderLink.Element key={`sliderlink${i}`} />)
//       }
//     </ul>
//   )
// }

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

function ToggleElement({ elementType, element }: ToggleElementProps ) {
  switch ( elementType ) {
    case ToggleType.link:
      return (
        <Link
          href={ element.href! }
          className='absolute'
        >{ element.text }
        </Link>
      )
    }
  }

function ToggleActiveElement({ containerId, classList, elementType, elementData }: ToggleActiveElementProps): React.JSX.Element {
  useEffect(() => {
    useToggleActiveElements(containerId)
  }, []
  )
  if (Array.isArray(classList)) {
    let classListFromArray: string = ''
    classList.forEach(className => {
      if (typeof className === 'string') return classListFromArray = [classListFromArray, className].join(' ')
      return console.warn(`Class name must be a string. ${className} was ignored.`)
    })
    classList = classListFromArray
  }

  
  return (
    <ul id={ containerId } className={ 'flex ' + (classList || '') }>
      {
        elementData.map((element, i)=> (
            <li key={ `toggle-element-${ i }` }>
              <ToggleElement
                elementType={ elementType }
                element={ element }
              />
            </li>
        ))
      }
    </ul>
  )
}

function Navbar() {
  const titleArray = CONFIG.meta.title.split(' ')
  const [brand, title] = [titleArray.slice(0,2).join(' '), titleArray.at(-1)]
  

  return (
    <nav className='w-full h-20 max-w-screen-lg navigation__container'>
      <div className="brand flex gap-1 items-center">
        <Logo
          id='logo'
        />
        <div className="flex flex-col">
          <span
            className="hidden md:block"
            id="brand">
              { brand  /* Quiet Goat */ }
          </span>
          <span 
            className="hidden md:block bg-gradient-to-r from-green-800 via-green-600 to-green-700 inline-block text-transparent bg-clip-text" 
            id="title">
              { title /* Adventures */ }
          </span>
        </div>
      </div>
      <div className="menus">
        <div className="info__container"></div>
        <ToggleActiveElement
          elementData={ CONFIG.navlinks }
          elementType={ ToggleType.link }
          containerId='link-container'
          classList={['']}
        />
      </div>
    </nav>
  )
}

export { Navbar }