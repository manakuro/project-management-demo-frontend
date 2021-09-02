import { useRecoilValue } from 'recoil'
import { teammateIdsByProjectIdSelector } from '../atom'

export const useTeammateIdsByProjectId = (projectId: string) => {
  const teammateIds = useRecoilValue(teammateIdsByProjectIdSelector(projectId))

  return {
    teammateIds,
  }
}
