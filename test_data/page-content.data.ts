import fs from 'fs'
import path from 'path'

export function getTextContent(language: string): object {
  const jsonPath = path.join(__dirname, `/text-json-files/${language}.json`)
  const jsonString = fs.readFileSync(jsonPath, 'utf-8').toString()
  const data = JSON.parse(jsonString)
  return data
}
