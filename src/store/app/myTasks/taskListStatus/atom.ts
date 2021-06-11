import { useCallback } from 'react'
import { useRecoilCallback, atom, useRecoilValue } from 'recoil'
import { TaskListStatus } from './type'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} from './types'

export const myTaskTaskStatusState = atom<TaskListStatus>({
  key: 'myTaskTaskStatusState',
  default: {
    id: '',
    taskListStatus: 1,
    sortStatus: 1,
  },
})

const sortStatues = {
  none: TASK_LIST_SORT_STATUS_TYPE_NONE,
  dueDate: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  likes: TASK_LIST_SORT_STATUS_TYPE_LIKES,
  alphabetical: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  project: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} as const
export type SortStatuses = keyof typeof sortStatues

export const useMyTasksTaskStatus = () => {
  const state = useRecoilValue(myTaskTaskStatusState)

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskListStatus>) => {
        set(myTaskTaskStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )
  const isSorted = useCallback(
    (status: SortStatuses) => state.sortStatus === sortStatues[status],
    [state.sortStatus],
  )

  const onSort = useCallback(
    (status: SortStatuses) => {
      setTaskStatus({ sortStatus: sortStatues[status] })
    },
    [setTaskStatus],
  )

  return {
    ...state,
    setTaskStatus,
    onSort,
    isSorted,
  }
}
