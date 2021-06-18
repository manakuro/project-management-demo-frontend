import { AttachmentType, AttachmentStatus } from './types'

export type Attachment = {
  id: string
  projectId: string
  taskId: string
  feedId: string
  name: string
  src: string
  createdAt: string
  type: AttachmentType
  status: AttachmentStatus
}
