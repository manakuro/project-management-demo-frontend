export type Subtask = {
  id: string
  taskId: string
  projectId: string
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
}
