import { TaskColumn } from 'src/store/entities/taskColumns'
import { TaskResponse } from 'src/store/entities/tasks'

export type MyTaskResponse = {
  myTasks: {
    id: string
    name: string
    teammateId: string // TODO: change to `userId`
    tasks: TaskResponse[]
    createdAt: string
    updatedAt: string
  }[]
  taskColumns: TaskColumn[]
}

export type MyTask = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  taskIds: string[]
  createdAt: string
  updatedAt: string
}

export type MyTaskTaskColumns = {
  taskColumnIds: string[]
}
