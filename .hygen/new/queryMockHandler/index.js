const { parseGraphql } = require('../../../scripts/graphql/parseGraphql')
const changeCase = require('change-case')
const {
  getGraphqlFilenames,
} = require('../../../scripts/graphql/getGraphqlFilenames')

module.exports = {
  params: async () => {
    const { paths } = await getGraphqlFilenames()

    const imports = paths.map((file) => {
      const parsed = parseGraphql(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `import { ${queryTypeName}Query } from './${queryTypeName}'`
    })

    const handlers = paths.map((file) => {
      const parsed = parseGraphql(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `${queryTypeName}Query(),`
    })

    return {
      imports,
      handlers,
    }
  },
}
