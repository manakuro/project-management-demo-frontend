import { TaskResponse } from 'src/store/entities/tasks'

export type TaskSectionResponse = {
  id: string
  name: string
  tasks: TaskResponse[]
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}

export type TaskSection = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}
