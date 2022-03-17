import type { TaskCollaboratorResponse } from 'src/graphql/types/taskCollaborator'

export type {
  TaskCollaboratorResponse,
  TaskCollaboratorCreatedSubscriptionResponse,
} from 'src/graphql/types/taskCollaborator'

export type TaskCollaborator = Omit<TaskCollaboratorResponse, 'teammate'>
