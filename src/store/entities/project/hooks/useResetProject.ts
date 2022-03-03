import { useRecoilCallback } from 'recoil'
import { projectState } from '../atom'

export const useResetProject = () => {
  const resetProject = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectState(id))
      },
    [],
  )

  const resetProjects = useRecoilCallback(
    ({ reset }) =>
      (projects: string[]) => {
        projects.forEach((id) => {
          reset(projectState(id))
        })
      },
    [],
  )

  return {
    resetProject,
    resetProjects,
  }
}
