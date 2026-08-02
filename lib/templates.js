import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getTemplateKey(type) {
  return `${type.charAt(0).toUpperCase()}${type.slice(1)}Template`
}

async function ensureDirectoryExists(directory, message) {
  if (!await fs.pathExists(directory)) {
    throw new Error(message)
  }

  return directory
}

/**
 * Resolves the template directory for a given template type.
 *
 * Resolution order:
 * 1. Template-specific directory (NodeTemplate, PythonTemplate, ...)
 * 2. Global Templates directory
 * 3. Bundled templates directory
 *
 * @param {string} type
 * @param {object} config
 * @returns {Promise<string>}
 * @throws {Error} If the selected template directory does not exist.
 */
export async function resolveTemplateDirectory(type, config) {
  const templateKey = getTemplateKey(type)

  // 1. Template-specific directory
  if (config[templateKey]) {
    return ensureDirectoryExists(
      config[templateKey],
      `Configured template directory does not exist:\n${config[templateKey]}`
    )
  }

  // 2. Global templates directory
  if (config.Templates) {
    const directory = path.join(config.Templates, type)

    return ensureDirectoryExists(
      directory,
      `Template "${type}" was not found in:\n${config.Templates}`
    )
  }

  // 3. Bundled templates directory
  const bundledDirectory = path.join(__dirname, '..', 'templates', type)

  return ensureDirectoryExists(
    bundledDirectory,
    `Bundled template "${type}" was not found.`
  )
}
