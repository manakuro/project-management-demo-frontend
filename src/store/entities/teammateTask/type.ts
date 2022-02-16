import type { TeammateTaskResponse } from 'src/graphql/types/teammateTask'

export type {
  TeammateTaskResponse,
  TeammateTaskCreatedSubscription as TeammateTaskCreatedSubscriptionResponse,
} from 'src/graphql/types/teammateTask'

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>
