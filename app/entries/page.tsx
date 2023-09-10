import React from 'react'
import { Post } from '../_components/Post'

function Page(): JSX.Element  {
  return (
    <div>
      <Post
        post={{
          _id: 'id',
          title: 'Post Title',
          caption: 'Caption(optional)',
          story: 'This is my post',
          category: '/'
        }}
      />
    </div>
  )
}

export default Page