const { parseQuery } = require('../../../scripts/graphql/parseQuery')
const changeCase = require('change-case')
const {
  getQueryFilenames,
} = require('../../../scripts/graphql/getQueryFilenames')

module.exports = {
  params: async () => {
    const { paths } = await getQueryFilenames()

    const imports = paths.map((file) => {
      const parsed = parseQuery(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `import { ${queryTypeName}Query } from './${queryTypeName}'`
    })

    const handlers = paths.map((file) => {
      const parsed = parseQuery(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `${queryTypeName}Query(),`
    })

    return {
      imports,
      handlers,
    }
  },
}
