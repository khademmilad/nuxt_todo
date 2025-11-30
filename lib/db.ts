import knex, { type Knex } from 'knex'
import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)
// Resolve knexfile.cjs from the project root so it's found when Nuxt bundles files to .nuxt
const configPath = path.resolve(process.cwd(), 'knexfile.cjs')

let config: any
try {
  config = require(configPath)
} catch (err) {
  throw new Error(`Failed to load knex config at ${configPath}: ${err}`)
}

const environment = process.env.NODE_ENV || 'development'
const knexConfig = config[environment]

declare global {
  // eslint-disable-next-line no-var
  var __NUXT_TODO_DB__: Knex | undefined
}

export function getDB(): Knex {
  if (globalThis.__NUXT_TODO_DB__) {
    return globalThis.__NUXT_TODO_DB__ as Knex
  }
  const db = knex(knexConfig)
  globalThis.__NUXT_TODO_DB__ = db
  return db
}

export async function closeDB(): Promise<void> {
  if (globalThis.__NUXT_TODO_DB__) {
    await globalThis.__NUXT_TODO_DB__!.destroy()
    globalThis.__NUXT_TODO_DB__ = undefined
  }
}

export default getDB