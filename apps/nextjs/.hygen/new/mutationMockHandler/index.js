const { parseMutation } = require('../../../scripts/graphql/parseMutation')
const changeCase = require('change-case')
const {
  getMutationFilenames,
} = require('../../../scripts/graphql/getMutationFilenames')

module.exports = {
  params: async () => {
    const { paths } = await getMutationFilenames()

    const imports = paths.map((file) => {
      const parsed = parseMutation(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `import { ${queryTypeName}Mutation } from './${queryTypeName}'`
    })

    const handlers = paths.map((file) => {
      const parsed = parseMutation(file)
      const queryTypeName = changeCase.camelCase(parsed.queryType)
      return `${queryTypeName}Mutation(),`
    })

    return {
      imports,
      handlers,
    }
  },
}
