import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { tabStatusForMyTasks, tasksTabStatues, TaskTabStatuses } from '../atom'
import { useTabStatusForMyTasksCommands } from './useTabStatusForMyTasksCommands'

export const useTabStatusForMyTasks = () => {
  const state = useRecoilValue(tabStatusForMyTasks)
  const { upsert } = useTabStatusForMyTasksCommands()

  const isTaskTabStatus = useCallback(
    (status: TaskTabStatuses) => state.tabStatus === tasksTabStatues[status],
    [state.tabStatus],
  )

  const setTabStatus = useCallback(
    (status: TaskTabStatuses) => {
      upsert({ tabStatus: tasksTabStatues[status] })
    },
    [upsert],
  )

  return {
    ...state,
    setTabStatus,
    isTaskTabStatus,
  }
}
