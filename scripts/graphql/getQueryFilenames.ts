import './enableImportGraphql'

import * as path from 'path'
import consola from 'consola'
import fg from 'fast-glob'

type Result = {
  paths: string[]
}
export const getQueryFilenames = async (): Promise<Result> => {
  let paths = await fg(['src/graphql/queries/**/*'], {
    ignore: ['**/*/fragments'],
    absolute: true,
  })

  if (!paths) {
    consola.error('GraphQL file not found')
    return { paths: [] }
  }

  paths = paths
    .filter((f) => isGraphqlFile(f))
    .filter((f) => f !== '__schema__.graphql')
    .filter((f) => !f.includes('Fragment'))

  return {
    paths,
  }
}

const isGraphqlFile = (file: string) => {
  return ['.gql', '.graphql'].includes(path.extname(file))
}
