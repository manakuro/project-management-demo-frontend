import { TaskResponse } from 'src/store/entities/tasks'

export type TaskSectionResponse = {
  id: string
  name: string
  tasks: TaskResponse[]
  createdAt: string
  updatedAt: string
}

export type TaskSection = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}
