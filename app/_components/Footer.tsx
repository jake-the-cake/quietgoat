import Link from 'next/link'
import React from 'react'

function Footer(): JSX.Element  {
  return (
    <footer className='flex justify-between'>
      <Link href={'/blog/new-entry'}>Create New Entry</Link>
      <Link href={'/api/entries/delete-all'}>Delete All</Link>
    </footer>
  )
}

export { Footer }