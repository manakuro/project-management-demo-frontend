import type { WorkspaceQuery } from '@/graphql/types';

export type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
  WorkspaceUpdatedSubscription as WorkspaceUpdatedSubscriptionResponse,
} from '@/graphql/types';
export type {
  WorkspaceQueryHookResult,
  WorkspaceLazyQueryHookResult,
} from '@/graphql/hooks';

export type WorkspaceResponse = WorkspaceQuery['workspace'];

export type Workspace = NonNullable<WorkspaceQuery['workspace']>;
