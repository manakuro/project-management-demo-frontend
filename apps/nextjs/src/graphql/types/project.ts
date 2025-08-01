import type { ProjectFragmentFragment } from '@/graphql/types';

export type ProjectResponse = NonNullable<ProjectFragmentFragment>;
export type {
  ProjectUpdatedSubscription as ProjectUpdatedSubscriptionResponse,
  ProjectsQuery,
} from '@/graphql/types';
