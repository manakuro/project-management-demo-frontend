import { useCallback } from 'react'
import { TabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import { useTabStatusForMyTasksCommands } from './useTabStatusForMyTasksCommands'

export const useTabStatusForMyTasksFromResponse = () => {
  const { upsert } = useTabStatusForMyTasksCommands()

  const setTabStatus = useCallback(
    (val: TabStatusForMyTasks) => {
      upsert(val)
    },
    [upsert],
  )

  return {
    setTabStatus,
  }
}
