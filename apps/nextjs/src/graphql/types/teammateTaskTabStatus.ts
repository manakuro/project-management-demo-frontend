import type { TeammateTaskTabStatusQuery } from '@/graphql/types';

export type {
  TeammateTaskTabStatusQuery,
  TeammateTaskTabStatusQueryVariables,
} from '@/graphql/types';
export type {
  TeammateTaskTabStatusQueryHookResult,
  TeammateTaskTabStatusLazyQueryHookResult,
} from '@/graphql/hooks';

export type TeammateTaskTabStatusResponse = NonNullable<
  TeammateTaskTabStatusQuery['teammateTaskTabStatus']
>;
