'use client'

import React, { useEffect } from 'react'
import { CONFIG } from '../_config'
import Link from 'next/link'
import { useToggleActiveElements } from '../_quiggle/useToggleActiveElement'
import LogoSvg from '../_assets/LogoSvg'

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
      <LogoSvg
        id="logo"
        width="3.2rem"
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