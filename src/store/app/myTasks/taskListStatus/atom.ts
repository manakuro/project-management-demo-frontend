import { useCallback } from 'react'
import { useRecoilCallback, atom, useRecoilValue } from 'recoil'
import { TaskListStatus } from './type'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TASK_LIST_STATUS_TYPE_ALL,
  TASK_LIST_STATUS_TYPE_COMPLETED,
  TASK_LIST_STATUS_TYPE_COMPLETED_1_WEEK,
  TASK_LIST_STATUS_TYPE_COMPLETED_2_WEEKS,
  TASK_LIST_STATUS_TYPE_COMPLETED_3_WEEKS,
  TASK_LIST_STATUS_TYPE_COMPLETED_TODAY,
  TASK_LIST_STATUS_TYPE_COMPLETED_YESTERDAY,
  TASK_LIST_STATUS_TYPE_INCOMPLETE,
  TaskListSortStatusType,
  TaskListStatusType,
} from './types'

const key = (str: string) => `src/store/app/myTasks/taskListStatus/${str}`

export const myTaskTaskStatusState = atom<TaskListStatus>({
  key: key('myTaskTaskStatusState'),
  default: {
    id: '',
    taskListStatus: 1,
    sortStatus: 1,
  },
})

export const useMyTasksTaskStatus = () => {
  const { state } = useMyTaskTaskStatusState()
  const { onSort, isSorted } = useSort()
  const { onSetTaskListStatus, isTaskListStatus } = useTaskListStatus()

  return {
    ...state,
    onSort,
    isSorted,
    onSetTaskListStatus,
    isTaskListStatus,
  }
}

function useMyTaskTaskStatusState() {
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

  return {
    state,
    setTaskStatus,
  }
}

const sortStatues = {
  none: TASK_LIST_SORT_STATUS_TYPE_NONE,
  dueDate: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  likes: TASK_LIST_SORT_STATUS_TYPE_LIKES,
  alphabetical: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  project: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} as const
export type SortStatuses = keyof typeof sortStatues

function useSort() {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()
  const isSorted = useCallback(
    (status: SortStatuses) => state.sortStatus === sortStatues[status],
    [state.sortStatus],
  )
  const isSortStatusKey = useCallback(
    (val: any): val is SortStatuses => typeof val === 'string',
    [],
  )

  const onSort = useCallback(
    (status: TaskListSortStatusType | SortStatuses) => {
      const val = isSortStatusKey(status) ? sortStatues[status] : status
      setTaskStatus({ sortStatus: val })
    },
    [setTaskStatus, isSortStatusKey],
  )

  return {
    onSort,
    isSorted,
  }
}
const taskListStatues = {
  incomplete: TASK_LIST_STATUS_TYPE_INCOMPLETE,
  completed: TASK_LIST_STATUS_TYPE_COMPLETED,
  completedToday: TASK_LIST_STATUS_TYPE_COMPLETED_TODAY,
  completedYesterday: TASK_LIST_STATUS_TYPE_COMPLETED_YESTERDAY,
  completed1Week: TASK_LIST_STATUS_TYPE_COMPLETED_1_WEEK,
  completed2Weeks: TASK_LIST_STATUS_TYPE_COMPLETED_2_WEEKS,
  completed3Weeks: TASK_LIST_STATUS_TYPE_COMPLETED_3_WEEKS,
  all: TASK_LIST_STATUS_TYPE_ALL,
} as const
export type TaskListStatuses = keyof typeof taskListStatues

function useTaskListStatus() {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()

  const isTaskListStatus = useCallback(
    (status: TaskListStatuses) =>
      state.taskListStatus === taskListStatues[status],
    [state.taskListStatus],
  )

  const onSetTaskListStatus = useCallback(
    (status: TaskListStatusType) => {
      setTaskStatus({ taskListStatus: status })
    },
    [setTaskStatus],
  )

  return {
    onSetTaskListStatus,
    isTaskListStatus,
  }
}
