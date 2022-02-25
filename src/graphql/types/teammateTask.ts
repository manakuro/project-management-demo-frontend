import { TeammateTaskFragmentFragment } from 'src/graphql/types'

export type TeammateTaskResponse = NonNullable<TeammateTaskFragmentFragment>
export type {
  TeammateTaskCreatedSubscription,
  TeammateTaskDeletedSubscription,
  TeammateTaskUpdatedSubscription,
} from 'src/graphql/types'
