const { parseGraphql } = require('../../../scripts/graphql/parseGraphql')
const changeCase = require('change-case')
const {
  getGraphqlFilenames,
} = require('../../../scripts/graphql/getGraphqlFilenames')

module.exports = {
  params: async () => {
    const { abs } = await getGraphqlFilenames()

    const imports = abs.map((file) => {
      const parsed = parseGraphql(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `import { ${queryTypeName}Query } from './${queryTypeName}'`
    })

    const handlers = abs.map((file) => {
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
