import fs from 'fs'
import path from 'path'
import * as changeCase from 'change-case'
import consola from 'consola'
import { asyncForEach } from '../util/asyncForEach'
import { getGraphqlFilenames } from './getGraphqlFilenames'
import { parseGraphql } from './parseGraphql'

const createPrevMockData = async () => {
  const { abs } = (await getGraphqlFilenames()) || { abs: [] }

  const result: Record<string, object> = {}
  await asyncForEach(abs, async (file) => {
    const parsed = parseGraphql(file)
    const fileName = changeCase.camelCase(parsed.queryType)
    const mockDataPath = path.resolve(
      __dirname,
      `../../src/testUtils/mock/queries/${fileName}/data.ts`,
    )

    if (!fs.existsSync(mockDataPath)) return
    const { data } = await import(mockDataPath)

    result[fileName] = data()
  })

  fs.writeFile(
    path.resolve(__dirname, './prevMockData.json'),
    JSON.stringify(result, null, 2),
    (err) => {
      if (err) {
        consola.error(err.message)
      }
    },
  )
  consola.success('Succeed!')
}

createPrevMockData()
