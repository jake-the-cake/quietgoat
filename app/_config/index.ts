import meta from "./meta"
import { navlinks } from "./navlinks"
import { db } from "./database"
import forms from "./forms"

const CONFIG = {
  meta,
  forms,
  navlinks,
  db,
  baseUri: process.env.SERVER_BASE_URI || 'http://localhost:3000'
}

export { CONFIG }