import type { TestUsersQuery } from 'src/graphql/types';

export type {
  TestUsersQuery,
  TestUsersQueryVariables,
} from 'src/graphql/types';
export type {
  TestUsersQueryHookResult,
  TestUsersLazyQueryHookResult,
} from 'src/graphql/hooks';

export type TestUser = NonNullable<EdgesNode<TestUsersQuery['testUsers']>>;
export type TestUsersPageInfo = PageInfo<TestUsersQuery['testUsers']>;
