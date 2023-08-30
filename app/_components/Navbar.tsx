import React from 'react'
import { CONFIG } from '../_config'
import Logo from './Logo'



function Navbar() {
  // console.log(img)
  const { title } = CONFIG.meta

  return (
    <nav className='w-full bg-white h-20 navigation__container'>
      <div className="brand flex gap-1">
        <Logo
          id='logo'
        />
        {/* <span className="hidden md:block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">{ CONFIG.meta.title }</span> */}
        <span className="hidden md:block gradient-green">{ CONFIG.meta.title }</span>
      </div>
    </nav>
  )

  // return (

    // <nav className='navigation__container'>
    //   <div className="navigation__content">
    //     <span>{ title }</span>
    //     <ul className="navigation__menu">
    //       <li className="navigation__link">Recent</li>
    //       {/* <li className="navigation__link">Popular</li> */}
    //       {/* <li className="navigation__link">Search</li> */}
    //       {/* <li className="navigation__link">Contact</li> */}
    //     </ul>
    //   </div>        
    // </nav>
  // )
}

export { Navbar }