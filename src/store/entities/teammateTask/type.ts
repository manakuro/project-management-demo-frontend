import type { TeammateTaskResponse } from 'src/graphql/types/teammateTask'

export type {
  TeammateTaskResponse,
  TeammateTaskCreatedSubscription as TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscription as TeammateTaskDeletedSubscriptionResponse,
} from 'src/graphql/types/teammateTask'

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>
