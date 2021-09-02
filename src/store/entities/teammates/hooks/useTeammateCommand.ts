import { useRecoilCallback } from 'recoil'
import { teammateSelector } from '../atom'
import { Teammate } from '../type'

export const useTeammateCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (teammate: Teammate) => {
        set(teammateSelector(teammate.id), teammate)
      },
    [],
  )

  return {
    upsert,
  }
}
