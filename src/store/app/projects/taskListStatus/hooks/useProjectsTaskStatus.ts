import { useProjectsTaskStatusState } from './useProjectsTaskStatusState'
import { useSort } from './useSort'
import { useTaskListStatus } from './useTaskListStatus'

export const useProjectsTaskStatus = () => {
  const { state } = useProjectsTaskStatusState()
  const { onSort, isSorted } = useSort()
  const { onSetTaskListStatus, isTaskListStatus } = useTaskListStatus()

  return {
    taskListStatus: state,
    onSort,
    isSorted,
    onSetTaskListStatus,
    isTaskListCompletedStatus: isTaskListStatus,
  }
}
