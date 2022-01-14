import { useRecoilValue } from 'recoil'
import { projectLightColorState } from '../atom'

export const useProjectLightColor = (projectLightColorId?: string) => {
  const projectLightColor = useRecoilValue(
    projectLightColorState(projectLightColorId || ''),
  )

  return {
    projectLightColor,
  }
}
