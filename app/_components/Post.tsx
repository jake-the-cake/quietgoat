import React from 'react'

interface PostProps {
  post: {
    id: string
    title: string
    caption?: string
    body: string
  }
}

function Post({ post }: PostProps): JSX.Element  {
  return (
    <article className='post__container'>
      <h1 className="post__header">{ post.title }</h1>
      {
        post?.caption
        ? <h3 className="post__caption">{ post.caption }</h3>
        : null
      }
      <section className="post__body">
        { post.body }
      </section>
    </article>
  )
}

export { Post }