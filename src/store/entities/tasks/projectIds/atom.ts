import { selectorFamily, useRecoilValue } from 'recoil'
import { projectTasksState } from 'src/store/entities/projectTasks'

export const tasksProjectIdsSelector = selectorFamily<string[], string>({
  key: 'tasksProjectIdsSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.taskId === taskId)
        .map((p) => p.projectId)
    },
})
export const useTasksProjectTaskIds = (taskId: string) => {
  const projectIds = useRecoilValue(tasksProjectIdsSelector(taskId))

  return {
    projectIds,
  }
}
