import { useMyTasksTaskIdsByDueDate } from 'src/store/app/myTasks/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
  addTask: () => void
}

const initialValue = (): Result => ({
  taskIds: [],
  addTask: () => {},
})

export const useTasksByDueDateFromTasks = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskIdsByDueDateResult = useMyTasksTaskIdsByDueDate(dueDate)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksTaskIdsByDueDateResult.taskIds,
      addTask: () => {},
    }
  }

  return initialValue()
}
