import { TaskFeedFragmentFragment } from 'src/graphql/types'

export type TaskFeedResponse = NonNullable<TaskFeedFragmentFragment>
export type {
  TaskFeedUpdatedSubscription,
  TaskFeedCreatedSubscription,
  TaskFeedDeletedSubscription,
  UpdateTaskFeedInput,
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
} from 'src/graphql/types'
