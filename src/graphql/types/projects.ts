import { ProjectsQuery } from 'src/graphql/types'

export type { ProjectsQuery, ProjectsQueryVariables } from 'src/graphql/types'
export type {
  ProjectsQueryHookResult,
  ProjectsLazyQueryHookResult,
} from 'src/graphql/hooks'

export type ProjectsResponse = ProjectsQuery['projects']
