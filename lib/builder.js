import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildFromStructure } from './structure.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function buildProject({ type, name, config }) {
  const baseDir = path.join(__dirname, '../templates', type)
  const structurePath = path.join(baseDir, 'structure')
  const filesPath = path.join(baseDir, 'files')
  const targetPath = path.join(process.cwd(), name)
  if (fs.existsSync(targetPath)) {
    console.error(`❌ A project named "${name}" already exists. Please choose a different name or remove the existing project.`)
    return
  }

  const variables = {
    name,
    author: config.author || 'unknown',
    license: config.license || 'MIT',
    version: '0.1.0'
  }

  try {
    await buildFromStructure(structurePath, filesPath, targetPath, variables)
    console.log(`✅ Project "${name}" created successfully using the "${type}" template in ${targetPath}`)
  } catch (err) {
    console.error(`❌ Failed to create project: ${err.message}`)
  }
}
