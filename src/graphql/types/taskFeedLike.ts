import { TaskFeedLikeFragmentFragment } from 'src/graphql/types'

export type TaskFeedLikeResponse = NonNullable<TaskFeedLikeFragmentFragment>

export type {
  TaskFeedLikeCreatedSubscription,
  TaskFeedLikeDeletedSubscription,
  CreateTaskFeedLikeInput,
} from 'src/graphql/types'
