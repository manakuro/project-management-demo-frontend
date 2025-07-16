import { useRecoilCallback } from 'recoil'
import { projectLightColorState } from '../atom'
import type { ProjectLightColor } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectLightColor: ProjectLightColor) => {
        set(projectLightColorState(projectLightColor.id), projectLightColor)
      },
    [],
  )

  return {
    upsert,
  }
}
