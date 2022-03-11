import { TaskFragmentFragment } from 'src/graphql/types'

export type TaskResponse = NonNullable<TaskFragmentFragment>
export type {
  TaskUpdatedSubscription,
  TaskDeletedSubscription,
  TaskUndeletedSubscription,
  TaskAssignedSubscription,
  UpdateTaskMutationVariables,
  UndeleteTaskInput,
  UpdateTaskInput,
} from 'src/graphql/types'
