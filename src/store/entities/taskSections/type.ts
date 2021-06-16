import { TaskResponse } from 'src/store/entities/tasks'

export type TaskSectionResponse = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  tasks: TaskResponse[]
  createdAt: string
  updatedAt: string
}

export type TaskSection = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  taskIds: string[]
  tasks: TaskResponse[]
  createdAt: string
  updatedAt: string
}
