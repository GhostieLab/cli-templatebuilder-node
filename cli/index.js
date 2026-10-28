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
  boolean: ['help', 'version', 'init'],
  string: ['type', 'name']
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
  try {
    const opened = await initConfig()
    process.exit(opened ? 0 : 1)
  } catch (err) {
    console.error(`❌ Failed to initialize configuration: ${err.message}`)
    process.exit(1)
  }
}

const type = args.type
const name = args.name

if (!type || !name) {
  console.error('❌ Both --type and --name are required.\nUsage: templatebuilder --type nodecli --name myproject')
  process.exit(1)
}

if (
  name === '.' ||
  name === '..' ||
  /[<>:"/\\|?*\x00-\x1F]/.test(name) ||
  /[. ]$/.test(name) ||
  /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\..*)?$/i.test(name)
) {
  console.error(`❌ Invalid project name: "${name}". Provide a valid directory name, not a path.`)
  process.exit(1)
}

try {
  const config = await loadConfig()
  await buildProject({ type, name, config })
} catch (err) {
  console.error(`❌ Failed to create project: ${err.message}`)
  process.exitCode = 1
}
