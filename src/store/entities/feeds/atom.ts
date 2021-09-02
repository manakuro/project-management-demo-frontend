import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Feed } from './type'

const key = (str: string) => `src/store/entities/feeds/${str}`

export const feedIdsState = atom<string[]>({
  key: key('feedIdsState'),
  default: [],
})
export const feedIdsGroupByTaskState = atom<Record<string, string[]>>({
  key: key('feedIdsGroupByTaskState'),
  default: {},
})
export const feedsState = atom<Feed[]>({
  key: key('feedsState'),
  default: [],
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
const feedState = atomFamily<Feed, string>({
  key: key('feedState'),
  default: defaultFeedStateValue(),
})

export const feedPinnedIdsSelector = selectorFamily<string[], string>({
  key: key('feedPinnedIdsSelector'),
  get:
    (taskId) =>
    ({ get }) => {
      const ids = get(feedIdsState)
      return ids.filter((id) => {
        const feed = get(feedSelector(id))
        return feed.isPinned && feed.taskId === taskId
      })
    },
})

export const feedSelector = selectorFamily<Feed, string>({
  key: key('feedSelector'),
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
