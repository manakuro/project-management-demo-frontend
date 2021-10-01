import { createState } from 'src/store/util'
import { FeedLike } from './type'

const key = (str: string) => `src/store/entities/feedLikes/${str}`

export const initialState = (): FeedLike => ({
  id: '',
  taskId: '',
  feedId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: feedLikeState,
  listState: feedLikesState,
  idsState: feedLikeIdsState,
} = createState({
  key,
  initialState,
})
