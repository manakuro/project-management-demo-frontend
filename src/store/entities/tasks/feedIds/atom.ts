import { selectorFamily, useRecoilValue } from 'recoil'
import { feedsState } from 'src/store/entities/feeds'

export const tasksFeedIdsSelector = selectorFamily<string[], string>({
  key: 'tasksFeedIdsSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const feeds = get(feedsState)
      return feeds.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})
export const useTasksFeedIds = (taskId: string) => {
  const feedIds = useRecoilValue(tasksFeedIdsSelector(taskId))

  return {
    feedIds,
  }
}
