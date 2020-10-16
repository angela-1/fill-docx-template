import assert from 'assert'
// import { stringify, parse } from '../src/search-params.js'
import { fillDocxTemplate } from '../src/fill-docx-template.js'

async function test(it, template, target, expected) {
  console.log('it', it)
  try {
    const data = {
      agenda: {
        title: 'nihao',
        start: '2月3日上午8:00',
        items: [
          {
            type: '田赛',
            order: 1,
            title: '男子100米',
            groupNumber: '23人4组',
            time: '10:30',
            addr: '田径场'
          }
        ]
      }
    }

    const result = await fillDocxTemplate(template, target, data)
    assert.strictEqual(result, expected)
    console.log(`\u001B[32m✓\u001B[39m ${expected}`)
  } catch (error) {
    console.error(error)
  }
}

test('fill docx template', 'agenda_v1.0.docx', 'dd.docx', 'dd.docx')

console.log('done')
