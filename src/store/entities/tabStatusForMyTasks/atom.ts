import { atom, selectorFamily } from 'recoil'
import { TabStatusForMyTasks } from './type'
import {
  TASK_TAB_STATUS_TYPE_BOARD,
  TASK_TAB_STATUS_TYPE_CALENDAR,
  TASK_TAB_STATUS_TYPE_FILES,
  TASK_TAB_STATUS_TYPE_LIST,
} from './types'

const key = (str: string) => `src/store/entities/tabStatusForMyTasks/${str}`

export const tabStatusForMyTasksState = atom<TabStatusForMyTasks>({
  key: key('tabStatusForMyTasksState'),
  default: {
    id: '',
    teammateId: '',
    tabStatus: 1,
  },
})

export const isTabStatusForMyTasksState = selectorFamily<
  boolean,
  TaskTabStatuses
>({
  key: key('isTabStatusForMyTasksState'),
  get:
    (status) =>
    ({ get }) => {
      const taskStatus = get(tabStatusForMyTasksState)
      return tasksTabStatues[status] === taskStatus.tabStatus
    },
})

export const tasksTabStatues = {
  list: TASK_TAB_STATUS_TYPE_LIST,
  board: TASK_TAB_STATUS_TYPE_BOARD,
  calendar: TASK_TAB_STATUS_TYPE_CALENDAR,
  files: TASK_TAB_STATUS_TYPE_FILES,
} as const

export type TaskTabStatuses = keyof typeof tasksTabStatues
