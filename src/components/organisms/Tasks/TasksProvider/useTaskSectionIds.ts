import { useMyTasks } from 'src/store/app/myTasks'
import { TasksProviderProps } from './TasksProvider'

type Result = {
  taskSectionIds: string[]
}
export type UseTaskSectionIdsResult = Result
export const initialUseTaskSectionIds = (): Result => ({
  taskSectionIds: [],
})
export const useTaskSectionIds = (props: TasksProviderProps): Result => {
  const useMyTasksResult = useMyTasks()
  const result = initialUseTaskSectionIds()

  if (props.myTasks) {
    result.taskSectionIds = useMyTasksResult.taskSectionIds
  }

  return result
}
