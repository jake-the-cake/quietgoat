import { IPost, Post, PostProps } from '@/app/_components/Post'
import { CONFIG } from '@/app/_config'
import Link from 'next/link'
import React from 'react'

async function Page({ params }: any): Promise<React.JSX.Element>  {
  const response = await fetch('http://127.0.0.1:3000/api/entries/read-all')
  const data: IPost[] = await response.json()
  const post = data.filter((value: IPost) => value._id === params.entryId)[0]

  return (
    <div className='card__container--full relative'>
      <span className='text-primary underline absolute left-2 text-xs font-bold italic hover:text-black top-1'>&larr; <Link href={ post.category }>View More In { getLinkInfo(post.category) }</Link></span>
      { post.title ? <Post
        post={ post }
      /> : null }
    </div>
  )
}

function getLinkInfo(entryCategory: string) {
  const links = CONFIG.navlinks
  return links.filter((link: any) => link.href === entryCategory )[0].label
}

export default Page