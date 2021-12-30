import { WorkspaceQuery } from 'src/graphql/types'

export type { WorkspaceQuery, WorkspaceQueryVariables } from 'src/graphql/types'
export type {
  WorkspaceQueryHookResult,
  WorkspaceLazyQueryHookResult,
} from 'src/graphql/hooks'

export type WorkspaceResponse = WorkspaceQuery['workspace']

export type Workspace = NonNullable<WorkspaceQuery['workspace']>