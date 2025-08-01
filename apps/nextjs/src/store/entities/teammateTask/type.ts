import type { TeammateTaskResponse } from '@/graphql/types/teammateTask';

export type {
  TeammateTaskResponse,
  TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskUpdatedSubscriptionResponse,
} from '@/graphql/types/teammateTask';

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>;
