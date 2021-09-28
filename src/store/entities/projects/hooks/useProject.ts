import { useRecoilCallback, useRecoilValue } from 'recoil'
import { COLORS } from 'src/hooks'
import { Project } from 'src/store/entities/projects'
import { projectSelector } from '../atom'
import { useProjectCommand } from './useProjectCommand'

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectSelector(projectId))
  const { upsert } = useProjectCommand()

  const setColor = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, colorId: string) => {
        const color = COLORS.find((c) => c.id === colorId)!
        const project = await snapshot.getPromise(projectSelector(projectId))

        upsert({
          ...project,
          color: { id: color.id, name: color.name, color: color.base },
        })
      },
    [upsert],
  )

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Project>) => {
        const current = await snapshot.getPromise(projectSelector(projectId))

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
  }
}
