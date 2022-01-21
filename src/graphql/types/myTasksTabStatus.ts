import { MyTasksTabStatusQuery } from 'src/graphql/types'

export type {
  MyTasksTabStatusQuery,
  MyTasksTabStatusQueryVariables,
} from 'src/graphql/types'
export type {
  MyTasksTabStatusQueryHookResult,
  MyTasksTabStatusLazyQueryHookResult,
} from 'src/graphql/hooks'

export type MyTasksTabStatusResponse = NonNullable<
  MyTasksTabStatusQuery['myTasksTabStatus']
>
