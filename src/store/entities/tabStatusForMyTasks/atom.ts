import { useCallback } from 'react'
import { useRecoilCallback, atom, useRecoilValue, selectorFamily } from 'recoil'
import { TabStatusForMyTasks } from './type'
import {
  TASK_TAB_STATUS_TYPE_BOARD,
  TASK_TAB_STATUS_TYPE_CALENDAR,
  TASK_TAB_STATUS_TYPE_FILES,
  TASK_TAB_STATUS_TYPE_LIST,
} from './types'

const key = (str: string) => `src/store/entities/tabStatusForMyTasks/${str}`

export const tabStatusForMyTasks = atom<TabStatusForMyTasks>({
  key: key('tabStatusForMyTasks'),
  default: {
    id: '',
    teammateId: '',
    tabStatus: 1,
  },
})

export const isTabStatusForMyTasks = selectorFamily<boolean, TaskTabStatuses>({
  key: key('isTabStatusForMyTasks'),
  get:
    (status) =>
    ({ get }) => {
      const taskStatus = get(tabStatusForMyTasks)
      return tasksTabStatues[status] === taskStatus.tabStatus
    },
})

const tasksTabStatues = {
  list: TASK_TAB_STATUS_TYPE_LIST,
  board: TASK_TAB_STATUS_TYPE_BOARD,
  calendar: TASK_TAB_STATUS_TYPE_CALENDAR,
  files: TASK_TAB_STATUS_TYPE_FILES,
} as const
export type TaskTabStatuses = keyof typeof tasksTabStatues

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

export const useTabStatusForMyTasksCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TabStatusForMyTasks>) => {
        set(tabStatusForMyTasks, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}

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