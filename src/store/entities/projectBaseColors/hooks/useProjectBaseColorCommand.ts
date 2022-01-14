import { useRecoilCallback } from 'recoil'
import { projectBaseColorState } from '../atom'
import { ProjectBaseColor } from '../type'

export const useProjectBaseColorCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectBaseColor: ProjectBaseColor) => {
        set(projectBaseColorState(projectBaseColor.id), projectBaseColor)
      },
    [],
  )

  return {
    upsert,
  }
}
