import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { TaskFeed } from './type'

const key = (str: string) => `src/store/entities/taskFeed/${str}`

export const initialState = (): TaskFeed => ({
  id: '',
  taskId: '',
  teammateId: '',
  description: {
    type: 'doc',
    content: [],
  },
  createdAt: '',
  updatedAt: '',
  isFirst: false,
  isPinned: false,
})

export const {
  state: taskFeedState,
  listState: taskFeedsState,
  idsState: taskFeedIdsState,
} = createState({ key, initialState })

export const taskFeedIdsByTaskIdState = selectorFamily<string[], string>({
  key: 'taskFeedIdsByTaskIdState',
  get:
    (taskId) =>
    ({ get }) => {
      const taskFeeds = get(taskFeedsState)
      return taskFeeds.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})
export const taskFeedIdsWithoutFirstState = selectorFamily<string[], string>({
  key: key('taskFeedIdsWithoutFirstState'),
  get:
    (taskId) =>
    ({ get }) => {
      const taskFeeds = get(taskFeedsState)
      return taskFeeds
        .filter((p) => p.taskId === taskId && !p.isFirst)
        .map((p) => p.id)
    },
})

export const taskFeedPinnedIdsState = selectorFamily<string[], string>({
  key: key('taskFeedPinnedIdsState'),
  get:
    (taskId) =>
    ({ get }) => {
      const ids = get(taskFeedIdsState)
      return ids.filter((id) => {
        const taskFeed = get(taskFeedState(id))
        return taskFeed.isPinned && taskFeed.taskId === taskId
      })
    },
})