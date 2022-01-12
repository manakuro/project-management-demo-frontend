import { useRecoilCallback } from 'recoil'
import { teammateState } from '../atom'
import { Teammate } from '../type'

export const useTeammatesResponse = () => {
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (teammates: Teammate[]) => {
        teammates.forEach((p) => {
          set(teammateState(p.id), p)
        })
      },
    [],
  )

  return {
    setTeammates,
  }
}
