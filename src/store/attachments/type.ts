import { AttachmentType, AttachmentStatus } from './types'

export type Attachment = {
  id: string
  taskId: string
  name: string
  src: string
  createdAt: string
  type: AttachmentType
  status: AttachmentStatus
}
