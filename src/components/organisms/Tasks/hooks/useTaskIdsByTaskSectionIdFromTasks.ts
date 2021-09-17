import { useMyTaskByTaskSectionId } from 'src/store/app/myTasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

export const initialUseTask = (): Result => ({
  taskIds: [],
})

export const useTaskIdsByTaskSectionIdFromTasks = (
  taskSectionId: string,
): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksResult = useMyTaskByTaskSectionId(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksResult.taskIds,
    }
  }

  return initialUseTask()
}
