import { useMyTask } from 'src/store/app/myTasks'
import { TasksProviderProps } from './TasksProvider'

type Result = {
  taskIds: string[]
}
export type CreateUseTaskIdsResult = ReturnType<typeof createUseTaskIds>
export const initialUseTaskSectionIds = (): Result => ({
  taskIds: [],
})

export const createUseTaskIds = (props: TasksProviderProps) => {
  return function useTaskIds(taskSectionId: string) {
    const useMyTasksResult = useMyTask(taskSectionId)
    const result = initialUseTaskSectionIds()

    if (props.myTasks) {
      result.taskIds = useMyTasksResult.taskIds
    }

    return result
  }
}
