import { useRecoilValue } from 'recoil'
import { projectTeammateState } from '../atom'

export const useProjectTeammate = (projectTeammateId: string) => {
  const projectTeammate = useRecoilValue(
    projectTeammateState(projectTeammateId),
  )

  return {
    projectTeammate,
  }
}
