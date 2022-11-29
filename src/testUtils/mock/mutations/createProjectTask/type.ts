// Generated by `yarn new:mutationMock`
import deepmerge from 'deepmerge'
import { CreateProjectTaskMutation as Mutation } from 'src/graphql/types/index.mock'
import { DeepPartial } from 'utility-types'

export type Response = DeepPartial<Mutation>
export type { CreateProjectTaskMutation as Mutation } from 'src/graphql/types/index.mock'

export type Options = {
  res?: Response
  networkError?: boolean
  deepMergeOptions?: deepmerge.Options
}
