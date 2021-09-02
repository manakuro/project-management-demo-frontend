import { useRecoilCallback } from 'recoil'
import { projectSelector } from '../atom'
import { Project } from '../type'

export const useProjectCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectSelector(project.id), project)
      },
    [],
  )

  return {
    upsert,
  }
}
