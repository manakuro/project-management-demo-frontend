import { useRecoilValue } from 'recoil'
import { projectTeammateSelector } from '../atom'

export const useProjectTeammate = (projectTeammateId: string) => {
  const projectTeammate = useRecoilValue(
    projectTeammateSelector(projectTeammateId),
  )

  return {
    projectTeammate,
  }
}
