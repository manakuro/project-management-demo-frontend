import { TaskActivityResponse } from 'src/graphql/types/taskActivity'

export type { TaskActivityResponse } from 'src/graphql/types/taskActivity'

export type TaskActivity = Omit<
  TaskActivityResponse,
  'taskActivityTasks' | 'activityType'
>
