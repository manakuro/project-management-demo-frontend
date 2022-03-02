import { useRecoilCallback } from 'recoil'
import { projectTaskState } from '../atom'
import { ProjectTask } from '../type'

export const useResetProjectTask = () => {
  const resetProjectTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectTaskState(id))
      },
    [],
  )

  const resetProjectTasks = useRecoilCallback(
    ({ reset }) =>
      (projectTasks: ProjectTask[]) => {
        projectTasks.forEach((t) => {
          reset(projectTaskState(t.id))
        })
      },
    [],
  )

  return {
    resetProjectTask,
    resetProjectTasks,
  }
}
