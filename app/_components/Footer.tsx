import Link from 'next/link'
import React from 'react'

function Footer(): JSX.Element  {
  return (
    <footer>
      <Link href={'/blog/new-entry'}>Create New Entry</Link>
    </footer>
  )
}

export { Footer }