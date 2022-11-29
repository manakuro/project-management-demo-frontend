import { ProjectsQuery as Query } from 'src/graphql/types/index.mock'
import { DeepPartial } from 'utility-types'

export type Options = DeepPartial<Query>
export type { ProjectsQuery as Query } from 'src/graphql/types/index.mock'
