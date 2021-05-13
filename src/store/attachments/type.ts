import { AttachmentType } from './types'

export type Attachment = {
  id: string
  taskId: string
  name: string
  src: string
  createdAt: string
  type: AttachmentType
}
