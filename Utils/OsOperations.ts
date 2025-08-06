import * as os from 'os'
import * as util from 'util'
import * as path from 'path'
import * as fs from 'fs'
// @ts-ignore
import mime from 'mime-types'

export function getDownloadFolderPath(): string {
  const homeDir = os.homedir()

  switch (os.platform()) {
    case 'win32':
      return path.join(homeDir, 'Downloads')
    case 'darwin':
      return path.join(homeDir, 'Downloads')
    case 'linux':
      return path.join(homeDir, 'Downloads')
    default:
      throw new Error('Unsupported OS')
  }
}

export function getLastDownloadedFileName(downloadDir: string): string {
  const files = fs.readdirSync(downloadDir)

  if (files.length === 0) {
    return ''
  }

  const sortedFiles = files
    .map((fileName) => ({
      name: fileName,
      time: fs.statSync(path.join(downloadDir, fileName)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)

  return sortedFiles[0].name
}

/**
 * Reads the text content of a file by its path.
 * @param filePath - The path to the file.
 * @returns {Promise<string>} A promise that resolves to the text content of the file.
 */
export function readFileText(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const readFileAsync = util.promisify(fs.readFile)

export async function readFileContent(filePath: string): Promise<string> {
  try {
    const data = await readFileAsync(filePath, 'utf8')
    return data
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`)
  }
}

export function isTextFile(filePath: string): boolean {
  const mimeType = mime.lookup(filePath)
  return mimeType ? mimeType.startsWith('text/') : false
}
