import Image from 'next/image'
import { Post } from './_components/Post'
import { CONFIG } from './_config'

export default async function Home() {
  const response = await fetch(CONFIG.baseUri + '/api/entries/read-all', {
    cache: 'no-cache'
  })
  const data = await response.json()

  return (
    <main className='flex flex-col-reverse gap-4'>
      {
        data.map((post: any, i: number) => (
          <Post
            post={ post }
            preview={ true }
          />

        ))
      }
    </main>
  )
}
