import { useCallback } from 'react'
import type { TeammateTaskTabStatus } from 'src/store/entities/teammateTaskTabStatus'
import { useUpsert } from './useUpsert'

export const useTeammateTaskTabStatusResponse = () => {
  const { upsert } = useUpsert()

  const setTeammateTaskTabStatus = useCallback(
    (data: TeammateTaskTabStatus) => {
      upsert(data)
    },
    [upsert],
  )

  return {
    setTeammateTaskTabStatus,
  }
}
