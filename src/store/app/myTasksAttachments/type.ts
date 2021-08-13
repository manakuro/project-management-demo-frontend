import { Attachment } from 'src/store/entities/attachments'

export type MyTaskAttachmentResponse = Attachment & {
  task: Task
}

export type Task = {
  id: string
  name: string
}
