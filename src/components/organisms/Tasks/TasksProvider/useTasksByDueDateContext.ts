import { useMyTasksTaskIdsByDueDate } from 'src/store/app/myTasks/tasks'
import { useTasksContext } from './TasksProvider'

type Result = {
  taskIds: string[]
}

const initialValue = (): Result => ({
  taskIds: [],
})

export const useTasksByDueDateContext = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksResult = useMyTasksTaskIdsByDueDate(dueDate)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksResult.taskIds,
    }
  }

  return initialValue()
}
