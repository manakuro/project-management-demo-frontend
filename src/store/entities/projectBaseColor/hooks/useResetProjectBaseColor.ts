import { useRecoilCallback } from 'recoil'
import { projectBaseColorState } from '../atom'

export const useResetProjectBaseColor = () => {
  const resetProjectBaseColor = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectBaseColorState(id))
      },
    [],
  )

  const resetProjectBaseColors = useRecoilCallback(
    ({ reset }) =>
      (projectBaseColors: string[]) => {
        projectBaseColors.forEach((id) => {
          reset(projectBaseColorState(id))
        })
      },
    [],
  )

  return {
    resetProjectBaseColor,
    resetProjectBaseColors,
  }
}
