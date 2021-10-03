import { useTaskListCompletedStatus } from './useTaskListCompletedStatus'
import { useTaskListSortStatus } from './useTaskListSortStatus'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

export const useMyTasksTaskListStatus = () => {
  const { taskListStatus } = useTaskListStatus()
  const { onSetTaskListStatus } = useTaskListStatusCommand()
  const { onSort, isSorted } = useTaskListSortStatus()
  const { isTaskListCompletedStatus } = useTaskListCompletedStatus()

  return {
    taskListStatus,
    onSort,
    isSorted,
    onSetTaskListStatus,
    isTaskListCompletedStatus,
  }
}
