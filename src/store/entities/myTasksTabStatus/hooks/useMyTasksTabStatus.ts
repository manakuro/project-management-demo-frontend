import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { tabStatusState, tasksTabStatues, TaskTabStatuses } from '../atom'
import { useMyTasksTabStatusCommand } from './useMyTasksTabStatusCommand'

export const useMyTasksTabStatus = () => {
  const state = useRecoilValue(tabStatusState)
  const { upsert } = useMyTasksTabStatusCommand()

  const isTabStatus = useCallback(
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
    isTabStatus,
  }
}
