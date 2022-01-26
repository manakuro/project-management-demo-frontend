import { useCallback } from 'react'
import { TeammateTaskTabStatus } from 'src/store/entities/teammateTaskTabStatus'
import { useTeammateTaskTabStatusCommand } from './useTeammateTaskTabStatusCommand'

export const useTeammateTaskTabStatusResponse = () => {
  const { upsert } = useTeammateTaskTabStatusCommand()

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
