import { useRecoilCallback, useRecoilValue } from 'recoil'
import { Project } from 'src/store/entities/projects'
import { projectState } from '../atom'
import { useProjectCommand } from './useProjectCommand'

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectState(projectId))
  const { upsert } = useProjectCommand()

  const setColor = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, projectBaseColorId: string) => {
        const project = await snapshot.getPromise(projectState(projectId))

        upsert({
          ...project,
          projectBaseColorId,
        })
      },
    [upsert],
  )

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Project>) => {
        const current = await snapshot.getPromise(projectState(projectId))

        await upsert({ ...current, ...val })
      },
    [upsert, projectId],
  )

  const setProjectName = useRecoilCallback(
    () => async (val: string) => {
      await setProject({ name: val })
    },
    [setProject],
  )

  return {
    project,
    setColor,
    setProjectName,
    setProject,
  }
}
