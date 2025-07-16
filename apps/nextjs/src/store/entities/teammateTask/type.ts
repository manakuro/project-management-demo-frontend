import type { TeammateTaskResponse } from 'src/graphql/types/teammateTask';

export type {
  TeammateTaskResponse,
  TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskUpdatedSubscriptionResponse,
} from 'src/graphql/types/teammateTask';

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>;
