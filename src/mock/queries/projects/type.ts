import deepmerge from 'deepmerge'
import { ProjectsQuery as Query } from 'src/graphql/types/index.mock'
import { DeepPartial } from 'utility-types'

export type { ProjectsQuery as Query } from 'src/graphql/types/index.mock'

export type Response = DeepPartial<Query>
export type Options = {
  deepMergeOptions?: deepmerge.Options
}
