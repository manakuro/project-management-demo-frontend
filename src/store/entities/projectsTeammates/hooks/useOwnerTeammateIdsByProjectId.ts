import { useRecoilValue } from 'recoil'
import { ownerProjectTeammateByProjectIdSelector } from '../atom'

export const useOwnerTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammate = useRecoilValue(
    ownerProjectTeammateByProjectIdSelector(projectId),
  )

  return {
    projectTeammate,
  }
}
