import type { WorkspaceTeammateResponse } from 'src/graphql/types/workspaceTeammate';

export type { WorkspaceTeammateResponse } from 'src/graphql/types/workspaceTeammate';

export type WorkspaceTeammate = Omit<WorkspaceTeammateResponse, 'teammate'>;
