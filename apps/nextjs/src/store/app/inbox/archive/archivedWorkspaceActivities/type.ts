import type { ArchivedWorkspaceActivityResponse } from 'src/graphql/types/archivedWorkspaceActivity';
export type { ArchivedWorkspaceActivityResponse } from 'src/graphql/types/archivedWorkspaceActivity';

export type ArchivedWorkspaceActivity = Omit<
  ArchivedWorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'archivedWorkspaceActivityTasks'
>;
