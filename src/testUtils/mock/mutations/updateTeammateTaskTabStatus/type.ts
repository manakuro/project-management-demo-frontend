// Generated by `yarn new:mutationMock`
import deepmerge from 'deepmerge'
import { UpdateTeammateTaskTabStatusMutation as Mutation } from 'src/graphql/types/index.mock'
import { DeepPartial } from 'utility-types'

export type Response = DeepPartial<Mutation>
export type { UpdateTeammateTaskTabStatusMutation as Mutation } from 'src/graphql/types/index.mock'

export type Options = {
  res?: Response
  networkError?: boolean
  deepMergeOptions?: deepmerge.Options
}
