import { TaskActivityTaskResponse } from 'src/graphql/types/taskActivityTask'

export type { TaskActivityTaskResponse } from 'src/graphql/types/taskActivityTask'

export type TaskActivityTask = Omit<TaskActivityTaskResponse, 'task'>
