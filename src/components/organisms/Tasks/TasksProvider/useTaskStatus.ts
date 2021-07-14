import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { TasksProviderProps } from './TasksProvider'

type Result = Omit<ReturnType<typeof useMyTasksTaskStatus>, 'id'>
export type UseTaskStatusResult = Result
export const initialUseTaskStatus = (): Result => ({
  taskListStatus: 1,
  sortStatus: 1,
  onSetTaskListStatus: () => {},
  onSort: () => {},
  isTaskListStatus: () => false,
  isSorted: () => false,
})

export type CreateUseTaskStatusResult = ReturnType<typeof createUseTaskStatus>
export const createUseTaskStatus = (props: TasksProviderProps) => {
  return function useTaskStatus(): Result {
    const useMyTasksTaskStatusResult = useMyTasksTaskStatus()

    if (props.isMyTasksPage) {
      return {
        ...useMyTasksTaskStatusResult,
      }
    }

    return initialUseTaskStatus()
  }
}
