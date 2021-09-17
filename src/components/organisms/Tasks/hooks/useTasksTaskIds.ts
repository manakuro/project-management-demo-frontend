import { useMyTasksTaskIds } from 'src/store/app/myTasks/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}
export const initialUseTaskSection = (): Result => ({
  taskIds: [],
})

export const useTasksTaskIds = () => {
  const { isMyTasksPage } = useTasksContext()

  const myTasksTaskIds = useMyTasksTaskIds()

  if (isMyTasksPage) {
    return {
      taskIds: myTasksTaskIds.taskIds,
    }
  }

  return initialUseTaskSection()
}
