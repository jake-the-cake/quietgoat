import meta from "./meta"
import { navlinks } from "./navlinks"
import { db } from "./database"

const CONFIG = {
  meta,
  navlinks,
  db,
  forms: {
    defaultPlaceholder: 'Enter text...'
  },
  baseUri: process.env.SERVER_BASE_URI || 'http://localhost:3000'
}

export { CONFIG }