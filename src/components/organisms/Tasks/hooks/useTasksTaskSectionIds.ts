import { useMyTasksTaskSectionIds } from 'src/store/app/myTasks/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSectionIds: string[]
}
export const initialUseTaskSection = (): Result => ({
  taskSectionIds: [],
})

export const useTasksTaskSectionIds = () => {
  const { isMyTasksPage } = useTasksContext()
  const myTasksTaskSectionIds = useMyTasksTaskSectionIds()

  if (isMyTasksPage) {
    return {
      taskSectionIds: myTasksTaskSectionIds.taskSectionIds,
    }
  }

  return initialUseTaskSection()
}
