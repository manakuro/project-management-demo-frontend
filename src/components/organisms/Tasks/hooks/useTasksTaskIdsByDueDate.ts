import { useMyTasksTaskIdsByDueDate } from 'src/store/app/myTasks/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

const initialValue = (): Result => ({
  taskIds: [],
})

export const useTasksTaskIdsByDueDate = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskIdsByDueDateResult = useMyTasksTaskIdsByDueDate(dueDate)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsByDueDateResult.taskIds,
    }
  }

  return initialValue()
}
