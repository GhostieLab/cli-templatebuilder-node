import fs from 'fs'
import os from 'os'
import path from 'path'
import { spawn } from 'child_process'
import { loadConfig } from './config.js'

export async function initConfig() {
  await loadConfig()

  const configDir = path.join(os.homedir(), '.templatebuilder')
  const configPath = path.join(configDir, 'config.json')

  console.log('Opening TemplateBuilder configuration file...')

  const editor =
    process.env.EDITOR || process.env.VISUAL || null

  const platform = process.platform
  let command, args

  if (editor) {
    // Use the user's preferred editor.
    const parts = editor.split(' ')
    command = parts[0]
    args = [...parts.slice(1), configPath]
  } else {
    // Fallback based on the operating system.
    if (platform === 'win32') {
      command = 'cmd'
      args = ['/c', 'start', 'notepad', `"${configPath}"`]
    } else if (platform === 'darwin') {
      command = 'open'
      args = [configPath]
    } else {
      command = 'xdg-open'
      args = [configPath]
    }
  }

  const child = spawn(command, args, {
    detached: true,
    stdio: 'ignore',
    shell: true,
  })

  child.on('error', (err) => {
    console.error('❌ Failed to open the configuration file automatically.')
    console.error(`Please open it manually: ${configPath}`)
    console.error(err)
  })

  child.unref()
}
