import { useRecoilCallback, useRecoilValue } from 'recoil'
import { projectsTaskStatusState } from '../atom'
import { TaskListStatus } from '../type'

export const useProjectsTaskStatusState = () => {
  const state = useRecoilValue(projectsTaskStatusState)
  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskListStatus>) => {
        set(projectsTaskStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    state,
    setTaskStatus,
  }
}
