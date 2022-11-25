// Generated by `yarn new:queryMock`
import deepmerge from 'deepmerge'
import { TestUserQuery as Query } from 'src/graphql/types/index.mock'
import { DeepPartial } from 'utility-types'

export type Response = DeepPartial<Query>
export type { TestUserQuery as Query } from 'src/graphql/types/index.mock'

export type Options = {
  res?: Response
  networkError?: boolean
  deepMergeOptions?: deepmerge.Options
}
