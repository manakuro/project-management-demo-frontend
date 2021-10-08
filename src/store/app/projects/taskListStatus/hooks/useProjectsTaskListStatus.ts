import { useTaskListCompletedStatus } from './useTaskListCompletedStatus'
import { useTaskListSortStatus } from './useTaskListSortStatus'
import { useTaskListStatus } from './useTaskListStatus'

export const useProjectsTaskListStatus = () => {
  return {
    ...useTaskListStatus(),
    ...useTaskListSortStatus(),
    ...useTaskListCompletedStatus(),
  }
}
