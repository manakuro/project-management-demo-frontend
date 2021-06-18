import { selectorFamily, useRecoilValue } from 'recoil'
import { tagsState } from 'src/store/entities/tags'

export const tasksTagIdsSelector = selectorFamily<string[], string>({
  key: 'tasksTagIdsSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const tags = get(tagsState)
      return tags.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})
export const useTasksTagIds = (taskId: string) => {
  const tagIds = useRecoilValue(tasksTagIdsSelector(taskId))
  return {
    tagIds,
  }
}
