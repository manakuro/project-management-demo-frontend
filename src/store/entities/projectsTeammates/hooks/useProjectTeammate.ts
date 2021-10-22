import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { projectTeammateState } from '../atom'

export const useProjectTeammate = (projectTeammateId: string) => {
  const projectTeammate = useRecoilValue(
    projectTeammateState(projectTeammateId),
  )
  const role = useMemo(() => {
    if (projectTeammate.isOwner) return 'Project Owner'
    return projectTeammate.role
  }, [projectTeammate.isOwner, projectTeammate.role])

  return {
    projectTeammate,
    role,
  }
}
