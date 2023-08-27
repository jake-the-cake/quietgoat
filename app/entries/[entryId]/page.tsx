import { Post } from '@/app/_components/Post'
import React from 'react'

function Page({ params }: any): JSX.Element  {
  return (
    <div>
      <Post
        post={{
          id: params.entryId,
          title: 'Post Title',
          body: 'BODY!'
        }}
      />
    </div>
  )
}

export default Page