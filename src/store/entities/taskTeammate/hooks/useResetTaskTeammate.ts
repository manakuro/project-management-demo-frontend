import { useRecoilCallback } from 'recoil'
import { taskTeammateState } from '../atom'

export const useResetTaskTeammate = () => {
  const resetTaskTeammate = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskTeammateState(id))
      },
    [],
  )

  const resetTaskTeammates = useRecoilCallback(
    ({ reset }) =>
      (taskTeammates: string[]) => {
        taskTeammates.forEach((id) => {
          reset(taskTeammateState(id))
        })
      },
    [],
  )

  return {
    resetTaskTeammate,
    resetTaskTeammates,
  }
}
