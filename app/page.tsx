import Image from 'next/image'
import { Post } from './_components/Post'

export default async function Home() {
  const response = await fetch('http://127.0.0.1:3000/api/entries/read-all')
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
