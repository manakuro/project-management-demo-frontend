import { useRecoilCallback } from 'recoil'
import { projectState } from '../atom'
import { Project } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectState(project.id), project)
      },
    [],
  )

  return {
    upsert,
  }
}
