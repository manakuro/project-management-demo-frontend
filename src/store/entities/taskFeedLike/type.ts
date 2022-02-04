export type TaskFeedLike = {
  id: string
  taskId: string
  taskFeedId: string
  teammateId: string // TODO: change to `userId`
  createdAt: string
  updatedAt: string
}
