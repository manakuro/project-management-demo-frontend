import { useRecoilCallback } from 'recoil'
import { projectLightColorState } from '../atom'
import { ProjectLightColor } from '../type'

export const useProjectLightColorCommand = () => {
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
