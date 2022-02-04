import { TaskFile } from 'src/store/entities/attachments'

export type MyTaskFileResponse = TaskFile & {
  task: Task
}

export type Task = {
  id: string
  name: string
}
