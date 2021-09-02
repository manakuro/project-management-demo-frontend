import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { FeedLike } from './type'

const key = (str: string) => `src/store/entities/feedLikes/${str}`

export const feedLikeIdsState = atom<string[]>({
  key: key('feedLikeIdsState'),
  default: [],
})

export const feedLikesState = atom<FeedLike[]>({
  key: key('feedLikesState'),
  default: [],
})

export const defaultFeedLikeStateValue = (): FeedLike => ({
  id: '',
  taskId: '',
  feedId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
const feedLikeState = atomFamily<FeedLike, string>({
  key: key('feedLikeState'),
  default: defaultFeedLikeStateValue(),
})

export const feedLikeSelector = selectorFamily<FeedLike, string>({
  key: key('feedLikeSelector'),
  get:
    (feedLikeId) =>
    ({ get }) =>
      get(feedLikeState(feedLikeId)),
  set:
    (feedLikeId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(feedLikeState(feedLikeId))
        return
      }

      set(feedLikeState(feedLikeId), newVal)
      set(feedLikesState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (get(feedLikeIdsState).find((feedLikeId) => feedLikeId === newVal.id))
        return

      set(feedLikeIdsState, (prev) => [...prev, newVal.id])
    },
})
