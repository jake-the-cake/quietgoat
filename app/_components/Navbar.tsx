import React from 'react'
import { CONFIG } from '../_config'

function Navbar() {
  const { title } = CONFIG.meta

  return (
    <nav className='navigation__container'>
      <div className="navigation__content">
        <span>{ title }</span>
        <ul className="navigation__menu">
          <li className="navigation__link">Recent</li>
          {/* <li className="navigation__link">Popular</li> */}
          {/* <li className="navigation__link">Search</li> */}
          {/* <li className="navigation__link">Contact</li> */}
        </ul>
      </div>        
    </nav>
  )
}

export { Navbar }