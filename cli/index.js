#!/usr/bin/env node
import minimist from 'minimist'
import { buildProject } from '../lib/builder.js'
import { loadConfig } from '../lib/config.js'
import { initConfig } from '../lib/init.js'

const args = minimist(process.argv.slice(2))

if (args.init) {
  initConfig()
  process.exit(0)
}

const type = args.type
const name = args.name

if (!type || !name) {
  console.error("❌ You need to provide both --type and --name.\n Usage: templatebuilder --type node --name myproject")
  process.exit(1)
}

const config = await loadConfig()
await buildProject({ type, name, config })
