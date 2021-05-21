import { FeedType } from './types'

export type Feed = {
  id: string
  taskId: string
  teammateId: string // TODO: change to `userId`
  description: string
  attachmentIds: string[]
  createdAt: string
  updatedAt: string
  type: FeedType
  isFirst: boolean
}
