'use client'

import Link from 'next/link'
import React, { useLayoutEffect, useRef } from 'react'
import { parseIntAsNumber } from '../_quiggle/parse/int'

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
  const targetRef = useRef()

  useLayoutEffect(() => {
    const current = targetRef.current! as HTMLDivElement
    if (current && current.offsetHeight > 160 && preview) {
      current.classList.add('post__container--preview')
    }
  }, [preview])

  const entryTitle = <h1 className="post__header text-primary text-2xl font-bold">{ post.title }</h1>
  
  const title = {
    link: <Link href={ '/entries/' + post._id }>{ entryTitle }</Link>,
    text: <>{ entryTitle }</>
  }
  
  const parentElementClassList = [
    'post__container',
    'px-7 py-4'
  ]

  const story = post.story.split('\n')
    


  return (
      <article ref={ targetRef as any } className={ parentElementClassList.join(' ') }>
        
        { preview ? title.link : title.text }

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

function unhidePreview(event: any) {
  event.target.closest('article').classList.remove('post__container--preview')
}

export { Post }