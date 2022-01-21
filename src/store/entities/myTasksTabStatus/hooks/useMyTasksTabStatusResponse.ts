import { useCallback } from 'react'
import { MyTasksTabStatus } from 'src/store/entities/myTasksTabStatus'
import { useMyTasksTabStatusCommand } from './useMyTasksTabStatusCommand'

export const useMyTasksTabStatusResponse = () => {
  const { upsert } = useMyTasksTabStatusCommand()

  const setMyTaskTabStatus = useCallback(
    (val: MyTasksTabStatus) => {
      upsert(val)
    },
    [upsert],
  )

  return {
    setMyTaskTabStatus,
  }
}
