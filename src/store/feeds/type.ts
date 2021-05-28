export type Feed = {
  id: string
  taskId: string
  teammateId: string // TODO: change to `userId`
  description: string
  attachmentIds: string[]
  createdAt: string
  updatedAt: string
  isFirst: boolean
  isPinned: boolean
}
