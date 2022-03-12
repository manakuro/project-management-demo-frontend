import { TaskTagFragmentFragment } from 'src/graphql/types'

export type TaskTagResponse = NonNullable<TaskTagFragmentFragment>

export type {
  TaskTagCreatedSubscription as TaskTagCreatedSubscriptionResponse,
  TaskTagDeletedSubscription as TaskTagDeletedSubscriptionResponse,
} from 'src/graphql/types'
