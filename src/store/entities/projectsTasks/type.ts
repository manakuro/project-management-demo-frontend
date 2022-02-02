import type { ProjectTaskResponse } from 'src/graphql/types/projectTask'

export type { ProjectTaskResponse } from 'src/graphql/types/projectTask'

export type ProjectTask = Omit<ProjectTaskResponse, 'project'>
