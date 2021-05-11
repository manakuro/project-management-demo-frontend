import { Subtask } from 'src/store/subtasks'
import { Attachment } from 'src/store/attachments'

export type Task = {
  id: string
  projectId: string
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTaskIds: string[]
  subTasks: Subtask[]
  assigneeId: string
  attachmentIds: string[]
  attachments: Attachment[]
}

export type TaskResponse = {
  id: string
  projectId: string
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTasks: Subtask[]
  assigneeId: string
  attachments: Attachment[]
}
