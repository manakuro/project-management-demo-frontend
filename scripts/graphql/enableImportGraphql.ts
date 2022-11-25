import { readFileSync } from 'fs'
import Module from 'module'
import { parse } from 'graphql'

const VALID_EXTENSIONS = ['graphql', 'graphqls', 'gql']

const handleModule = (m: any, filename: string) => {
  const content = readFileSync(filename, 'utf-8')

  m.exports = parse(content)
}

// GraphQLファイルをimportで読み込めるようにする
VALID_EXTENSIONS.forEach((ext) => {
  if ((Module as any)._extensions[`.${ext}`]) return
  ;(Module as any)._extensions[`.${ext}`] = handleModule
})
