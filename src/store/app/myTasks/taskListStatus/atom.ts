import { atom, selectorFamily } from 'recoil'
import { TaskListStatus } from './type'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TASK_LIST_COMPLETED_STATUS_TYPE_ALL,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY,
  TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE,
} from './types'

const key = (str: string) => `src/store/app/myTasks/taskListStatus/${str}`

export const taskListStatusState = atom<TaskListStatus>({
  key: key('taskListStatusState'),
  default: {
    id: '',
    taskListCompletedStatus: 1,
    taskListSortStatus: 1,
  },
})

export const isTaskListCompletedStatusState = selectorFamily<
  boolean,
  TaskListCompletedStatuses
>({
  key: key('isTaskListCompletedStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState)
      return (
        taskStatus.taskListCompletedStatus === taskListCompletedStatues[key]
      )
    },
})

export const isTaskListSortStatusState = selectorFamily<
  boolean,
  TaskListSortStatuses
>({
  key: key('isTaskListSortStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState)
      return taskStatus.taskListSortStatus === taskListSortStatues[key]
    },
})

export const taskListSortStatues = {
  none: TASK_LIST_SORT_STATUS_TYPE_NONE,
  dueDate: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  likes: TASK_LIST_SORT_STATUS_TYPE_LIKES,
  alphabetical: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  project: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} as const
export type TaskListSortStatuses = keyof typeof taskListSortStatues

export const taskListCompletedStatues = {
  incomplete: TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE,
  completed: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED,
  completedToday: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY,
  completedYesterday: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY,
  completed1Week: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK,
  completed2Weeks: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS,
  completed3Weeks: TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS,
  all: TASK_LIST_COMPLETED_STATUS_TYPE_ALL,
} as const
export type TaskListCompletedStatuses = keyof typeof taskListCompletedStatues
