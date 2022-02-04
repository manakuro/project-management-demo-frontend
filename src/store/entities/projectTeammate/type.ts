import type { ProjectTeammateResponse } from 'src/graphql/types/projectTeammate'

export type { ProjectTeammateResponse } from 'src/graphql/types/projectTeammate'

export type ProjectTeammate = Omit<ProjectTeammateResponse, 'teammate'>
