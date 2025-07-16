import { useRecoilCallback } from 'recoil'
import { projectBaseColorState } from '../atom'
import type { ProjectBaseColor } from '../type'

export const useUpsert = () => {
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
