import React from 'react'
import { Post } from '../_components/Post'

function Page(): JSX.Element  {
  return (
    <div>
      <Post
        post={{
          id: 'id',
          title: 'Post Title',
          caption: 'Caption(optional)',
          body: 'This is my post'
        }}
      />
    </div>
  )
}

export default Page