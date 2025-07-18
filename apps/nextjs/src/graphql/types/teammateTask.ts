import type { TeammateTaskFragmentFragment } from 'src/graphql/types';

export type TeammateTaskResponse = NonNullable<TeammateTaskFragmentFragment>;
export type {
  TeammateTaskCreatedSubscription as TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscription as TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskUpdatedSubscription as TeammateTaskUpdatedSubscriptionResponse,
} from 'src/graphql/types';
