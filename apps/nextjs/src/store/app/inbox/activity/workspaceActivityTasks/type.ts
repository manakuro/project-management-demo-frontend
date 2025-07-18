import type { WorkspaceActivityTaskResponse } from 'src/graphql/types/workspaceActivityTask';
export type { WorkspaceActivityTaskResponse } from 'src/graphql/types/workspaceActivityTask';

export type WorkspaceActivityTask = Omit<WorkspaceActivityTaskResponse, 'task'>;
