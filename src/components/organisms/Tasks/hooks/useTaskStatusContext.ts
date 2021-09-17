import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { useTasksContext } from '../TasksProvider'

type Result = Omit<ReturnType<typeof useMyTasksTaskStatus>, 'id'>
export const initialUseTaskStatus = (): Result => ({
  taskListStatus: 1,
  sortStatus: 1,
  onSetTaskListStatus: () => {},
  onSort: () => {},
  isTaskListStatus: () => false,
  isSorted: () => false,
})

export const useTaskStatusContext = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskStatusResult = useMyTasksTaskStatus()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskStatusResult,
    }
  }

  return initialUseTaskStatus()
}
