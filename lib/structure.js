import fs from 'fs-extra'
import path from 'path'

export async function buildFromStructure(structurePath, filesPath, targetPath, variables) {
  const lines = (await fs.readFile(structurePath, 'utf-8'))
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))

  for (const line of lines) {
    const target = path.join(targetPath, line)

    if (line.endsWith('/')) {
      // It's a directory → create it.
      await fs.ensureDir(target)
    } else {
      const filename = path.basename(line)
      const fileSource = path.join(filesPath, filename)

      let content = ''

      try {
        // Read the source file if it exists.
        content = await fs.readFile(fileSource, 'utf-8')
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err
        }

        // If the source file doesn't exist in files/, create an empty file.
        console.warn(`⚠️ Source file "${filename}" not found in files/. Creating an empty file.`)
      }

      // Replace template variables.
      const processed = Object.entries(variables).reduce(
        (acc, [key, val]) => acc.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), val),
        content
      )

      await fs.ensureDir(path.dirname(target))
      await fs.writeFile(target, processed)
    }
  }
}
