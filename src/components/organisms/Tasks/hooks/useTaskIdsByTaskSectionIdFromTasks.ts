import { useMyTasksTaskIdsByTaskSectionId } from 'src/store/app/myTasks/tasks'
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
  const useMyTasksTaskIdsByTaskSectionIdResult =
    useMyTasksTaskIdsByTaskSectionId(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsByTaskSectionIdResult.taskIds,
    }
  }

  return initialUseTask()
}
