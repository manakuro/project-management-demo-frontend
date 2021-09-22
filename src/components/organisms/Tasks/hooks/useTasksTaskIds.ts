import { useMyTasksTaskIds } from 'src/store/app/myTasks/tasks'
import { useProjectsTaskIds } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

export const useTasksTaskIds = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const useMyTasksTaskIdsResult = useMyTasksTaskIds()
  const useProjectsTaskIdsResult = useProjectsTaskIds()

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsResult.taskIds,
    }
  }

  return {
    taskIds: useProjectsTaskIdsResult.taskIds,
  }
}
