import Link from 'next/link'
import React from 'react'

interface PostProps {
  post: {
    _id: string
    title: string
    category: string
    story: string
    caption?: string
  }
}

function Post({ post }: PostProps): JSX.Element  {
  return (
    <article className='post__container p-4'>
      <Link href={ post.category + '/entries/' + post._id }>
      <h1 className="post__header text-primary text-2xl font-bold">{ post.title }</h1>
      </Link>
      {
        post?.caption
        ? <h3 className="post__caption text-grey italic text-sm">{ post.caption }</h3>
        : null
      }
      <section className="text-black pt-4">
        { post.story }
      </section>
    </article>
  )
}

export { Post }