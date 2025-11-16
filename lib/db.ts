import knex, { type Knex } from 'knex'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const config = require('../knexfile.cjs')

const environment = process.env.NODE_ENV || 'development'
const knexConfig = config[environment]

let db: Knex | null = null

export function getDB(): Knex {
  if (!db) {
    db = knex(knexConfig)
  }
  return db
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.destroy()
    db = null
  }
}

export default getDB()