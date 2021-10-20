import { Attachment } from 'src/store/entities/attachments'

export type ProjectsFileResponse = Attachment & {
  task: Task
}

export type Task = {
  id: string
  name: string
}
