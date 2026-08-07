#!/usr/bin/env node
import { readFile } from 'fs/promises'
import minimist from 'minimist'
import { buildProject } from '../lib/builder.js'
import { loadConfig } from '../lib/config.js'
import { initConfig } from '../lib/init.js'
import { showHelp } from './help.js'

const args = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version'
  },
  boolean: ['help', 'version', 'init']
})

if (args.help) {
  showHelp()
  process.exit(0)
}

if (args.version) {
  const packageJsonPath = new URL('../package.json', import.meta.url)
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

  console.log(packageJson.version)
  process.exit(0)
}

if (args.init) {
  const opened = await initConfig()
  process.exit(opened ? 0 : 1)
}

const type = args.type
const name = args.name

if (!type || !name) {
  console.error("❌ You need to provide both --type and --name.\n Usage: templatebuilder --type node --name myproject")
  process.exit(1)
}

const config = await loadConfig()
await buildProject({ type, name, config })
