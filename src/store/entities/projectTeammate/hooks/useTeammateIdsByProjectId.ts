import { useRecoilValue } from 'recoil'
import { teammateIdsByProjectIdState } from '../atom'

export const useTeammateIdsByProjectId = (projectId: string) => {
  const teammateIds = useRecoilValue(teammateIdsByProjectIdState(projectId))

  return {
    teammateIds,
  }
}
