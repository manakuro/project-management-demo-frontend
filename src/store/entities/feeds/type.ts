export type FeedResponse = {
  id: string
  taskId: string
  teammateId: string // TODO: change to `userId`
  description: string
  createdAt: string
  updatedAt: string
  isFirst: boolean
  isPinned: boolean
}

export type Feed = {
  id: string
  taskId: string
  teammateId: string // TODO: change to `userId`
  description: string
  createdAt: string
  updatedAt: string
  isFirst: boolean
  isPinned: boolean
}
