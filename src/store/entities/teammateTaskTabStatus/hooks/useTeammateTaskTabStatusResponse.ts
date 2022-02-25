import { useCallback } from 'react'
import { TeammateTaskTabStatus } from 'src/store/entities/teammateTaskTabStatus'
import { useUpsert } from './useUpsert'

export const useTeammateTaskTabStatusResponse = () => {
  const { upsert } = useUpsert()

  const setTeammateTaskTabStatus = useCallback(
    (val: TeammateTaskTabStatus) => {
      upsert(val)
    },
    [upsert],
  )

  return {
    setTeammateTaskTabStatus,
  }
}
