import { useMemo } from 'react'
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
export const tasksFeedIdsWithOutFirstSelector = selectorFamily<
  string[],
  string
>({
  key: 'tasksFeedIdsWithOutFirstSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const feeds = get(feedsState)
      return feeds
        .filter((p) => p.taskId === taskId && !p.isFirst)
        .map((p) => p.id)
    },
})
export const useTasksFeedIds = (taskId: string) => {
  const feedIds = useRecoilValue(tasksFeedIdsSelector(taskId))
  const feedIdsWithoutFirst = useRecoilValue(
    tasksFeedIdsWithOutFirstSelector(taskId),
  )

  return {
    feedIds: useMemo(() => feedIds, [feedIds]),
    feedIdsWithoutFirst: useMemo(
      () => feedIdsWithoutFirst,
      [feedIdsWithoutFirst],
    ),
  }
}
