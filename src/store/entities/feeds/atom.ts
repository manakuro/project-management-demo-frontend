import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { Feed } from './type'

const key = (str: string) => `src/store/entities/feeds/${str}`

export const initialState = (): Feed => ({
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

export const {
  state: feedState,
  listState: feedsState,
  idsState: feedIdsState,
} = createState({ key, initialState })

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
