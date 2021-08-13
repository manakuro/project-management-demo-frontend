import { Attachment } from 'src/store/entities/attachments'

export type MyTaskFileResponse = Attachment & {
  task: Task
}

export type Task = {
  id: string
  name: string
}
