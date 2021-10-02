import { atom, selectorFamily } from 'recoil'
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
} from './types'

const key = (str: string) => `src/store/app/myTasks/taskListStatus/${str}`

export const taskListStatusState = atom<TaskListStatus>({
  key: key('taskListStatusState'),
  default: {
    id: '',
    taskListStatus: 1,
    sortStatus: 1,
  },
})

export const isTaskListStatusState = selectorFamily<boolean, TaskListStatuses>({
  key: key('isTaskListStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState)
      return taskStatus.taskListStatus === taskListStatues[key]
    },
})

export const isTaskListSortStatusState = selectorFamily<boolean, SortStatuses>({
  key: key('isTaskListSortStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState)
      return taskStatus.sortStatus === sortStatues[key]
    },
})

export const sortStatues = {
  none: TASK_LIST_SORT_STATUS_TYPE_NONE,
  dueDate: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  likes: TASK_LIST_SORT_STATUS_TYPE_LIKES,
  alphabetical: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  project: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} as const
export type SortStatuses = keyof typeof sortStatues

export const taskListStatues = {
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
