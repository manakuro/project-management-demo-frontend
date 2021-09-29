import { useRecoilValue } from 'recoil'
import { ownerTeammateIdByProjectIdSelector } from '../atom'

export const useOwnerTeammateIdsByProjectId = (projectId: string) => {
  const teammateId = useRecoilValue(
    ownerTeammateIdByProjectIdSelector(projectId),
  )

  return {
    teammateId,
  }
}
