import { TaskResponse } from 'src/store/entities/tasks'

export type MyTaskResponse = Omit<MyTask, 'taskIds'> & {
  tasks: TaskResponse[]
}

export type MyTask = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  taskIds: string[]
  createdAt: string
  updatedAt: string
}
