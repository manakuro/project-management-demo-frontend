import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Feed } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'

export const feedIdsState = atom<string[]>({
  key: 'feedIdsState',
  default: [],
})
export const feedIdsGroupByTaskState = atom<Record<string, string[]>>({
  key: 'feedIdsGroupByTaskState',
  default: {},
})
export const feedsState = atom<Feed[]>({
  key: 'feedsState',
  default: [],
})

export const defaultFeedStateValue = (): Feed => ({
  id: '',
  taskId: '',
  teammateId: '',
  description: '',
  attachmentIds: [],
  createdAt: '',
  updatedAt: '',
  type: 1,
  isFirst: false,
})
const feedState = atomFamily<Feed, string>({
  key: 'feedState',
  default: defaultFeedStateValue(),
})

export const feedSelector = selectorFamily<Feed, string>({
  key: 'feedSelector',
  get:
    (feedId) =>
    ({ get }) =>
      get(feedState(feedId)),
  set:
    (feedId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(feedState(feedId))
        return
      }

      set(feedState(feedId), newVal)
      set(feedsState, (prev) =>
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

      if (get(feedIdsState).find((feedId) => feedId === newVal.id)) return

      set(feedIdsState, (prev) => [...prev, newVal.id])
      set(feedIdsGroupByTaskState, (prev) => {
        return {
          ...prev,
          [newVal.taskId]: [...(prev[newVal.taskId] || []), newVal.id],
        }
      })
    },
})

export const useFeedsByTask = (taskId: string) => {
  const feedIdsGroupByTask = useRecoilValue(feedIdsGroupByTaskState)
  const { upsertFeed } = useFeed()

  const feedIds = useMemo(() => {
    return feedIdsGroupByTask[taskId] || []
  }, [feedIdsGroupByTask, taskId])

  const addFeed = useCallback(() => {
    upsertFeed({
      ...defaultFeedStateValue(),
      id: uuid(),
      taskId,
    })
  }, [taskId, upsertFeed])

  return {
    feedIds,
    addFeed,
  }
}

export const useFeeds = () => {
  const feedIds = useRecoilValue(feedIdsState)
  const feeds = useRecoilValue(feedsState)

  const setFeeds = useRecoilCallback(
    ({ set }) =>
      (feeds: Feed[]) => {
        feeds.forEach((p) => {
          set(feedSelector(p.id), p)
        })
      },
    [],
  )

  return {
    feedIds,
    feeds,
    setFeeds,
  }
}

export const useFeed = (feedId?: string) => {
  const feed = useRecoilValue(feedSelector(feedId || ''))

  const upsertFeed = useRecoilCallback(
    ({ set }) =>
      (feed: Feed) => {
        set(feedSelector(feed.id), feed)
      },
    [],
  )

  const setFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Feed>) => {
        const prev = await snapshot.getPromise(feedSelector(feed.id))
        upsertFeed({
          ...prev,
          ...val,
        })
      },
    [upsertFeed, feed.id],
  )

  return {
    feed,
    upsertFeed,
    setFeed,
  }
}
