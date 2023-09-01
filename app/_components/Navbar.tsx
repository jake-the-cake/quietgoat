'use client'

import React, { EventHandler, MouseEvent, ReactElement, useEffect } from 'react'
import { CONFIG } from '../_config'
import Logo from './Logo'
import Link from 'next/link'


class LinkSlider {
  links: {
    index: number,
    Element: () => ReactElement,
    width: () => number,
    element: () => HTMLElement
    parent: () => HTMLElement
  }[]
  active: number

  constructor(links: NavLinkInfo[], active: number) {
    this.active = active
    this.links = []
    links.forEach((link, i) => {
      this.links.push({
          Element: () => this.newNavLink(link, i),
          index: i,
          width: () => document.getElementById(`navli${i}`)!.offsetWidth,
          element: () => document.getElementById(`nava${i}`)!,
          parent: () => this.links[i].element().parentElement!
       })
    })
    console.log(this)
  }

  newNavLink(link: NavLinkInfo, i: number): React.JSX.Element {
    console.log(link)
    return (
      <li className="relative" id={`navli${i}`}>
        <Link 
          href={link.href}
          id={`nava${i}`}
          className={'relative right-0 px-2' + (link.isActive ? ' active' : '')}
          onClick={this.handleNavLink()}
        >
          { link.label }
        </Link>
      </li>

    )
  }

  handleNavLink() {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const id = (e.target as any).id.replace('nava', '')
      const activeLink = this.links[this.active]?.element()
      if (activeLink) {
        // const scrollRight = activeLink.offsetWidth
        for (let i = this.active + 1; i < this.links.length; i++) {
          this.links[i].element().style.right = 0 + 'px'
        }        
        this.links[this.active].element().classList.toggle('active')
      }
      const scrollLeft = this.links[id].element().offsetWidth
      console.log(scrollLeft)
      // const currentPosition = parseInt(this.links[this.active].element().style.right) || 0
      this.active = id
      // const scrollLeft = newActiveLink.offsetWidth
      for (let i = this.active; i < this.links.length; i++) {
      //   console.log(currentPosition)
        this.links[i].element().style.right = scrollLeft + 'px'
      }   
      // this.links[this.active].element().classList.toggle('active')
    }
  }
}


function returnActivePageIndex(links: any) {
  let active
  const currentPath = links.filter((link: any) => link.href === window.location.pathname)[0]
  console.log(currentPath)
  links.forEach((link: any, i: number) => {
    console.log(currentPath.href, link.href)
    if (currentPath.href === link.href) active = i
  })
  return typeof active === 'number' ? active : -1
}

function NavLinks({links}: NavLinksProps) {
  const active = returnActivePageIndex(links)
  console.log(active)
  if (links[active]) links[active].isActive = true

  const navLinks = new LinkSlider(links, active)


  useEffect(() => {
    // navLinks.
  }, [])

  return (
    <ul className='flex'>
      {
        navLinks.links.map((SliderLink, i) => <SliderLink.Element key={`sliderlink${i}`} />)
      }
    </ul>
  )
}


function Navbar() {
  const { title } = CONFIG.meta

  return (
    <nav className='w-full bg-white h-20 navigation__container'>
      <div className="brand flex gap-1">
        {/* <Logo
          id='logo'
        /> */}
        {/* <span className="hidden md:block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">{
          CONFIG.meta.title }
        </span> */}
        {/* <span className="hidden md:block gradient-green">{ CONFIG.meta.title }</span> */}
      </div>
      <NavLinks 
        links={ CONFIG.navlinks }
        active={ 0 }
      />
    </nav>
  )
}

export { Navbar }