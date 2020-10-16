import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import * as fs from 'fs'

async function readContent(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    return fs.readFile(
      filePath,
      (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

async function writeContent(filePath: string, data: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    return fs.writeFile(filePath, data, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function nullGetter(part: any) {
  if (!part.module) {
    return ''
  }
  if (part.module === 'rawxml') {
    return ''
  }
  return ''
}

export async function fillDocxTemplate(
  template: string,
  target: string,
  data: any
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const content = await readContent(template)
      const zip = new PizZip(content)
      // @ts-ignore
      const doc = new Docxtemplater(zip, {
        nullGetter,
        paragraphLoop: true
      })
      doc.setData(data)
      doc.render()
      const buf = doc.getZip().generate({ type: 'nodebuffer' })
      await writeContent(target, buf)
      resolve(target)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
