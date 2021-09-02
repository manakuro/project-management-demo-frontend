import { useMyTaskTaskStatusState } from './useMyTaskTaskStatusState'
import { useSort } from './useSort'
import { useTaskListStatus } from './useTaskListStatus'

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
