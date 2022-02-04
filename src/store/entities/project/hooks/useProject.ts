import { useRecoilValue } from 'recoil'
import { projectState } from '../atom'
import { useSubscription } from './useSubscription'

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectState(projectId))
  useSubscription(projectId)

  return {
    project,
  }
}
