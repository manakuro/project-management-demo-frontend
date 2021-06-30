import { TaskResponse } from 'src/store/entities/tasks'

export type TaskSectionResponse = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  tasks: TaskResponse[]
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}

export type TaskSection = {
  id: string
  name: string
  teammateId: string // TODO: change to `userId`
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}
