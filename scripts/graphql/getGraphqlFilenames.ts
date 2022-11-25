import './enableImportGraphql'

import * as fs from 'fs/promises'
import * as path from 'path'
import consola from 'consola'

export const getGraphqlFilenames = async () => {
  const dir = path.resolve(__dirname, '../../src/queries')
  const filenames = (await fs.readdir(dir)) as string[]
  if (!filenames) {
    consola.error('Not found:', dir)
    return { abs: [], filenames: [] }
  }

  const graphqlFiles = filenames
    .filter((f) => isGraphqlFile(f))
    .filter((f) => f !== '__schema__.graphql')
    .filter((f) => !f.includes('Fragment'))

  const abs = graphqlFiles.map((f) => `${dir}/${f}`)

  return {
    abs,
    filenames: graphqlFiles,
  }
}

const isGraphqlFile = (file: string) => {
  return ['.gql', '.graphql'].includes(path.extname(file))
}
