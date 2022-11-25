const { parseGraphql } = require('../../../scripts/graphql/parseGraphql')
const changeCase = require('change-case')
const fs = require('fs')

module.exports = {
  params: async ({ args }) => {
    const parsed = parseGraphql(args.file)
    const queryTypeName = changeCase.camelCase(parsed.queryType)

    const fileName = queryTypeName
    const Query = changeCase.pascalCase(`${parsed.queryType}Query`)
    const queries = parsed.queries
    const setQueryName = `set${Query}`
    const operationName = changeCase.pascalCase(parsed.queryType)

    return {
      fileName,
      queryTypeName,
      Query,
      setQueryName,
      operationName,
      queries,
      data: JSON.stringify({}),
    }
  },
}
