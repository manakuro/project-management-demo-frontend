import type { WorkspaceActivityResponse } from 'src/graphql/types/workspaceActivity'
export type { WorkspaceActivityResponse } from 'src/graphql/types/workspaceActivity'

export type WorkspaceActivity = Omit<
  WorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'workspaceActivityTasks'
>
