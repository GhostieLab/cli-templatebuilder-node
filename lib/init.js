import os from 'os'
import path from 'path'
import { spawnSync } from 'child_process'
import { loadConfig } from './config.js'

export async function initConfig() {
  await loadConfig()

  const configDir = path.join(os.homedir(), '.templatebuilder')
  const configPath = path.join(configDir, 'config.json')

  console.log('Opening TemplateBuilder configuration file in Vim...')

  const result = spawnSync('vim', [configPath], {
    stdio: 'inherit',
  })

  if (result.error) {
    console.error('❌ Failed to start Vim.')
    console.error('Make sure Vim is installed and available in your PATH.')
    return false
  }

  if (result.status !== 0) {
    console.error(`❌ Vim exited with status ${result.status}.`)
    return false
  }

  return true
}
