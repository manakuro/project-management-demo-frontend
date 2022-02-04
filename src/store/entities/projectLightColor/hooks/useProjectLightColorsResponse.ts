import { useRecoilCallback } from 'recoil'
import { projectLightColorState } from '../atom'
import { ProjectLightColor } from '../type'

export const useProjectLightColorsResponse = () => {
  const setProjectLightColors = useRecoilCallback(
    ({ set }) =>
      (projectLightColors: ProjectLightColor[]) => {
        projectLightColors.forEach((p) => {
          set(projectLightColorState(p.id), p)
        })
      },
    [],
  )

  return {
    setProjectLightColors,
  }
}
