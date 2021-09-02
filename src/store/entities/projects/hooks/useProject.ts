import { useRecoilCallback, useRecoilValue } from 'recoil'
import { COLORS } from 'src/hooks'
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

  return {
    project,
    setColor,
  }
}
