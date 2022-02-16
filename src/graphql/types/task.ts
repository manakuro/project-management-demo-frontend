import { TaskFragmentFragment } from 'src/graphql/types'

export type TaskResponse = NonNullable<TaskFragmentFragment>
export type {
  TaskUpdatedSubscription,
  UpdateTaskMutationVariables,
  UpdateTaskInput,
} from 'src/graphql/types'
