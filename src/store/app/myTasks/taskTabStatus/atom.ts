import { useCallback } from 'react'
import { useRecoilCallback, atom, useRecoilValue } from 'recoil'
import { TaskTabStatus } from './type'
import {
  TASK_TAB_STATUS_TYPE_BOARD,
  TASK_TAB_STATUS_TYPE_CALENDAR,
  TASK_TAB_STATUS_TYPE_FILES,
  TASK_TAB_STATUS_TYPE_LIST,
} from './types'

const key = (str: string) => `src/store/app/myTasks/taskTabStatus/${str}`

export const myTaskTaskTabStatus = atom<TaskTabStatus>({
  key: key('myTaskTaskTabStatus'),
  default: {
    id: '',
    teammateId: '',
    tabStatus: 1,
  },
})

const tasksTabStatues = {
  list: TASK_TAB_STATUS_TYPE_LIST,
  board: TASK_TAB_STATUS_TYPE_BOARD,
  calendar: TASK_TAB_STATUS_TYPE_CALENDAR,
  files: TASK_TAB_STATUS_TYPE_FILES,
} as const
export type TaskTabStatuses = keyof typeof tasksTabStatues

export const useMyTasksTabStatus = () => {
  const state = useRecoilValue(myTaskTaskTabStatus)
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskTabStatus>) => {
        set(myTaskTaskTabStatus, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

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
