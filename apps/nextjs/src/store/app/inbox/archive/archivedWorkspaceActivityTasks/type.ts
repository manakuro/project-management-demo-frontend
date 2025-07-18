import type { ArchivedWorkspaceActivityTaskResponse } from 'src/graphql/types/archivedWorkspaceActivityTask';
export type { ArchivedWorkspaceActivityTaskResponse } from 'src/graphql/types/archivedWorkspaceActivityTask';

export type ArchivedWorkspaceActivityTask = Omit<
  ArchivedWorkspaceActivityTaskResponse,
  'task'
>;
