import { useMyTasksTaskIdsByTaskSectionId } from 'src/store/app/myTasks/tasks'
import { useProjectsTaskIdsByTaskSectionId } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

export const useTasksTaskIdsByTaskSectionId = (
  taskSectionId: string,
): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskIdsByTaskSectionIdResult =
    useMyTasksTaskIdsByTaskSectionId(taskSectionId)
  const useProjectsTaskIdsByTaskSectionIdResult =
    useProjectsTaskIdsByTaskSectionId(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsByTaskSectionIdResult.taskIds,
    }
  }

  return {
    taskIds: useProjectsTaskIdsByTaskSectionIdResult.taskIds,
  }
}
