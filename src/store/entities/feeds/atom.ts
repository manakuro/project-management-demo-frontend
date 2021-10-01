import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Feed } from './type'

const key = (str: string) => `src/store/entities/feeds/${str}`

export const feedIdsState = atom<string[]>({
  key: key('feedIdsState'),
  default: [],
})

export const feedsState = atom<Feed[]>({
  key: key('feedsState'),
  default: [],
})
export const feedIdsByTaskIdState = selectorFamily<string[], string>({
  key: 'feedIdsByTaskIdState',
  get:
    (taskId) =>
    ({ get }) => {
      const feeds = get(feedsState)
      return feeds.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})
export const feedIdsWithoutFirstState = selectorFamily<string[], string>({
  key: key('feedIdsWithoutFirstState'),
  get:
    (taskId) =>
    ({ get }) => {
      const feeds = get(feedsState)
      return feeds
        .filter((p) => p.taskId === taskId && !p.isFirst)
        .map((p) => p.id)
    },
})
export const defaultFeedStateValue = (): Feed => ({
  id: '',
  taskId: '',
  teammateId: '',
  description: JSON.stringify(
    {
      type: 'doc',
      content: [],
    },
    null,
    2,
  ),
  createdAt: '',
  updatedAt: '',
  isFirst: false,
  isPinned: false,
})
const state = atomFamily<Feed, string>({
  key: key('state'),
  default: defaultFeedStateValue(),
})

export const feedPinnedIdsState = selectorFamily<string[], string>({
  key: key('feedPinnedIdsState'),
  get:
    (taskId) =>
    ({ get }) => {
      const ids = get(feedIdsState)
      return ids.filter((id) => {
        const feed = get(feedState(id))
        return feed.isPinned && feed.taskId === taskId
      })
    },
})

export const feedState = selectorFamily<Feed, string>({
  key: key('feedState'),
  get:
    (feedId) =>
    ({ get }) =>
      get(state(feedId)),
  set:
    (feedId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(feedId))
        return
      }

      set(state(feedId), newVal)
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
    },
})
