import { useRecoilValue } from 'recoil'
import { projectIconState } from '../atom'

export const useProjectIcon = (projectIconId?: string) => {
  const projectIcon = useRecoilValue(projectIconState(projectIconId || ''))

  return {
    projectIcon,
  }
}
