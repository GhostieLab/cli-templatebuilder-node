import fs from 'fs-extra'
import path from 'path'
import { buildFromStructure } from './structure.js'
import { resolveTemplateDirectory } from './templates.js'

export async function buildProject({ type, name, config }) {
  const baseDir = await resolveTemplateDirectory(type, config)

  const structurePath = path.join(baseDir, 'structure')
  const filesPath = path.join(baseDir, 'files')
  const targetPath = path.join(process.cwd(), name)

  if (fs.existsSync(targetPath)) {
    throw new Error(
      `A project named "${name}" already exists. Please choose a different name or remove the existing project.`
    )
  }

  const variables = {
    name,
    author: config.author || 'unknown',
    license: config.license || 'MIT',
    version: '0.1.0'
  }

  await buildFromStructure(
    structurePath,
    filesPath,
    targetPath,
    variables
  )

  console.log(
    `✅ Project "${name}" created successfully using the "${type}" template in ${targetPath}`
  )
}
