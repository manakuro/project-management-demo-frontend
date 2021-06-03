import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
  useRecoilState,
} from 'recoil'
import { FeedLike } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'

export const feedLikeIdsState = atom<string[]>({
  key: 'feedLikeIdsState',
  default: [],
})

export const feedLikesState = atom<FeedLike[]>({
  key: 'feedLikesState',
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
  key: 'feedLikeState',
  default: defaultFeedLikeStateValue(),
})

export const feedLikeSelector = selectorFamily<FeedLike, string>({
  key: 'feedLikeSelector',
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

export const useFeedLikesByFeedId = (feedId: string) => {
  const { upsertFeedLike } = useFeedLike()
  const [feedLikesAll, setFeedLikesAll] = useRecoilState(feedLikesState)

  const addFeedLike = useCallback(
    (teammateId: string) => {
      const id = uuid()
      upsertFeedLike({
        ...defaultFeedLikeStateValue(),
        id,
        feedId,
        teammateId,
      })

      return id
    },
    [feedId, upsertFeedLike],
  )

  const deleteFeedLike = useRecoilCallback(
    () => (teammateId: string) => {
      const index = feedLikesAll.findIndex(
        (f) => f.teammateId === teammateId && f.feedId === feedId,
      )
      const newValue = [
        ...feedLikesAll.slice(0, index),
        ...feedLikesAll.slice(index + 1),
      ]
      setFeedLikesAll(newValue)
    },
    [feedId, feedLikesAll, setFeedLikesAll],
  )

  const feedLikes = useMemo(
    () => feedLikesAll.filter((f) => f.feedId === feedId),
    [feedLikesAll, feedId],
  )
  const teammateIds = useMemo(
    () => feedLikes.map((f) => f.teammateId),
    [feedLikes],
  )

  return {
    addFeedLike,
    deleteFeedLike,
    feedLikes,
    teammateIds,
  }
}

export const useFeedLikes = () => {
  const feedLikeIds = useRecoilValue(feedLikeIdsState)
  const feedLikes = useRecoilValue(feedLikesState)

  const setFeedLikes = useRecoilCallback(
    ({ set }) =>
      (data: FeedLike[]) => {
        data.forEach((d) => {
          set(feedLikeSelector(d.id), d)
        })
      },
    [],
  )
  const isFeedLiked = useCallback(
    ({ feedId, teammateId }: { feedId: string; teammateId: string }) => {
      return feedLikes.some(
        (f) => f.feedId === feedId && f.teammateId === teammateId,
      )
    },
    [feedLikes],
  )

  return {
    feedLikeIds,
    feedLikes,
    setFeedLikes,
    isFeedLiked,
  }
}

export const useFeedLike = (feedLikeId?: string) => {
  const feedLike = useRecoilValue(feedLikeSelector(feedLikeId || ''))

  const upsertFeedLike = useRecoilCallback(
    ({ set }) =>
      (feedLike: FeedLike) => {
        set(feedLikeSelector(feedLike.id), feedLike)
      },
    [],
  )

  const setFeedLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<FeedLike>) => {
        const prev = await snapshot.getPromise(feedLikeSelector(feedLike.id))
        upsertFeedLike({
          ...prev,
          ...val,
        })
      },
    [upsertFeedLike, feedLike.id],
  )

  return {
    feedLike,
    upsertFeedLike,
    setFeedLike,
  }
}
