import { useRecoilCallback } from 'recoil'
import { projectTeammateState } from '../atom'

export const useResetProjectTeammate = () => {
  const resetProjectTeammate = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectTeammateState(id))
      },
    [],
  )

  const resetProjectTeammates = useRecoilCallback(
    ({ reset }) =>
      (projectTeammates: string[]) => {
        projectTeammates.forEach((id) => {
          reset(projectTeammateState(id))
        })
      },
    [],
  )

  return {
    resetProjectTeammate,
    resetProjectTeammates,
  }
}
