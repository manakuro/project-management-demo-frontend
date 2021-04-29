import { Subtask } from 'src/store/subtasks'

export type Task = {
  id: string
  projectId: string
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTaskIds: string[]
  subTasks: Subtask[]
}

export type TaskResponse = {
  id: string
  projectId: string
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTasks: Subtask[]
}
