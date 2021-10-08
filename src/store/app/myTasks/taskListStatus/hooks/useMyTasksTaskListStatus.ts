import { useTaskListCompletedStatus } from './useTaskListCompletedStatus'
import { useTaskListSortStatus } from './useTaskListSortStatus'
import { useTaskListStatus } from './useTaskListStatus'

export const useMyTasksTaskListStatus = () => {
  return {
    ...useTaskListStatus(),
    ...useTaskListSortStatus(),
    ...useTaskListCompletedStatus(),
  }
}
