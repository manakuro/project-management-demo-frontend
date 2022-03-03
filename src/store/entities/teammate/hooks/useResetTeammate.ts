import { useRecoilCallback } from 'recoil'
import { teammateState } from '../atom'

export const useResetTeammate = () => {
  const resetTeammate = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(teammateState(id))
      },
    [],
  )

  const resetTeammates = useRecoilCallback(
    ({ reset }) =>
      (teammates: string[]) => {
        teammates.forEach((id) => {
          reset(teammateState(id))
        })
      },
    [],
  )

  return {
    resetTeammate,
    resetTeammates,
  }
}
