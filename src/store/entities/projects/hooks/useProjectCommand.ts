import { useRecoilCallback } from 'recoil'
import { projectState } from '../atom'
import { Project } from '../type'

export const useProjectCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectState(project.id), project)
      },
    [],
  )

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (payload: { projectId: string } & Partial<Omit<Project, 'id'>>) => {
        const current = await snapshot.getPromise(
          projectState(payload.projectId),
        )

        await upsert({ ...current, ...payload })
      },
    [upsert],
  )

  return {
    upsert,
    setProject,
  }
}
