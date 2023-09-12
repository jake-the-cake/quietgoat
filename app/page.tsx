import Feed from './_components/Feed'
import { CONFIG } from './_config'

export default function Home() {

  return (
		<Feed
			category={ CONFIG.navlinks[0] }
		/>
  )
}
