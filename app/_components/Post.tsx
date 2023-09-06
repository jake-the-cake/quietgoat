'use client'

import Link from 'next/link'
import React from 'react'

export interface IPost {
  _id: string
  title: string
  category: string
  story: string
  caption?: string
}

export interface PostProps {
  post: IPost
  preview?: true
}

function Post({ post, preview }: PostProps): JSX.Element  {
  const parentElementClassList = [
    'post__container',
    'px-7 py-4'
  ]
  if (preview === true) parentElementClassList.push('post__container--preview')

  const EntryTitle = <h1 className="post__header text-primary text-2xl font-bold">{ post.title }</h1>

  const story = post.story.split('\n')

  return (
    <article className={ parentElementClassList.join(' ') }>
      
      { preview 
          ? <Link href={ '/entries/' + post._id }> 
              { EntryTitle }
            </Link>
          : <>{ EntryTitle }</> }

      { post?.caption
          ? <h3 className="post__caption text-grey italic text-sm">
              { post.caption }
            </h3>
          : null }

      <section
        className="text-black pt-4 flex flex-col gap-2"
        onClick={ preview 
          ? unhidePreview
          : () => false }
      >
        { story.map((paragraph: string, i: number) => <p key={`paragraph-${ i }`}>{ paragraph }</p>) }
      </section>

    </article>
  )
}

// function 


function unhidePreview(event: any) {
  event.target.closest('article').classList.remove('post__container--preview')
}

export { Post }