import { TeammateTaskTabStatusQuery } from 'src/graphql/types'

export type {
  TeammateTaskTabStatusQuery,
  TeammateTaskTabStatusQueryVariables,
} from 'src/graphql/types'
export type {
  TeammateTaskTabStatusQueryHookResult,
  TeammateTaskTabStatusLazyQueryHookResult,
} from 'src/graphql/hooks'

export type TeammateTaskTabStatusResponse = NonNullable<
  TeammateTaskTabStatusQuery['teammateTaskTabStatus']
>
