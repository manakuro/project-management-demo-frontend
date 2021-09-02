import { useRecoilValue } from 'recoil'
import { projectIdsState } from '../atom'

export const useProjectIds = () => {
  const projectIds = useRecoilValue(projectIdsState)

  return {
    projectIds,
  }
}
