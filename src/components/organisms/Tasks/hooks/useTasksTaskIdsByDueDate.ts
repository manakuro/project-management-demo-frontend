import { useMyTasksTaskIdsByDueDate } from 'src/store/app/myTasks/tasks'
import { useProjectsTaskIdsByDueDate } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

export const useTasksTaskIdsByDueDate = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskIdsByDueDateResult = useMyTasksTaskIdsByDueDate(dueDate)
  const useProjectsTaskIdsByDueDateResult = useProjectsTaskIdsByDueDate(dueDate)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsByDueDateResult.taskIds,
    }
  }

  return {
    taskIds: useProjectsTaskIdsByDueDateResult.taskIds,
  }
}
