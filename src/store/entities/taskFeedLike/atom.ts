import { createState } from 'src/store/util'
import type { TaskFeedLike } from './type'

const key = (str: string) => `src/store/entities/taskFeedLikes/${str}`

export const initialState = (): TaskFeedLike => ({
  id: '',
  taskId: '',
  taskFeedId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskFeedLikeState,
  listState: taskFeedLikesState,
  idsState: taskFeedLikeIdsState,
} = createState({
  key,
  initialState,
})
