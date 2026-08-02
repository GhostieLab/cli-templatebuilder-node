import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import os from 'os'
import fs from 'fs-extra'

export async function loadConfig() {
  const configDir = path.join(os.homedir(), '.templatebuilder')
  const configPath = path.join(configDir, 'config.json')

  // Create the default configuration if it doesn't exist.
  if (!await fs.pathExists(configPath)) {
    await fs.ensureDir(configDir)
    const defaultConfig = {
      author: "unknown",
      license: "MIT",
      Templates: "",
      NodeTemplate: "",
      PythonTemplate: "",
      BashTemplate: ""
    }
    await writeFile(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8')
    return defaultConfig
  }

  // Load the existing configuration.
  try {
    const content = await readFile(configPath, 'utf-8')
    return JSON.parse(content)
  } catch {
    throw new Error('❌ Failed to read ~/.templatebuilder/config.json')
  }
}
