import { TaskFile } from 'src/store/entities/attachments'

export type ProjectsFileResponse = TaskFile & {
  task: Task
}

export type Task = {
  id: string
  name: string
}
