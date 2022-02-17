import { useRecoilValue } from 'recoil'
import { projectState } from '../atom'
import { useProjectUpdatedSubscription } from './useProjectUpdatedSubscription'

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectState(projectId))
  useProjectUpdatedSubscription(projectId)

  return {
    project,
  }
}
