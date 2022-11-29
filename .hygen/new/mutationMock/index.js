const { parseMutation } = require('../../../scripts/graphql/parseMutation')
const changeCase = require('change-case')
const fs = require('fs')

module.exports = {
  params: async ({ args }) => {
    const parsed = parseMutation(args.file)
    const queryTypeName = changeCase.camelCase(parsed.queryType)

    const fileName = queryTypeName
    const Mutation = changeCase.pascalCase(`${parsed.queryType}Mutation`)
    const queries = parsed.queries
    const setMutationName = `set${Mutation}`
    const operationName = changeCase.pascalCase(parsed.queryType)

    return {
      fileName,
      queryTypeName,
      Mutation,
      setMutationName,
      operationName,
      queries,
      data: JSON.stringify({}),
    }
  },
}
