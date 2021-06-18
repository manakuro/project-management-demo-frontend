import { selectorFamily, useRecoilValue } from 'recoil'
import { taskTeammatesState } from 'src/store/entities/taskTeammates'

export const tasksTeammateIdsSelector = selectorFamily<string[], string>({
  key: 'tasksTeammateIdsSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const teammates = get(taskTeammatesState)
      return teammates.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})
export const useTasksTeammateIds = (taskId: string) => {
  const teammateIds = useRecoilValue(tasksTeammateIdsSelector(taskId))

  return {
    teammateIds,
  }
}
