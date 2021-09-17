import { useMyTasksTaskSections } from 'src/store/app/myTasks/taskSections'
import { TaskSection } from 'src/store/entities/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSections: TaskSection[]
}
export const initialUseTaskSections = (): Result => ({
  taskSections: [],
})

export const useTaskSectionsContext = () => {
  const { isMyTasksPage } = useTasksContext()

  const myTaskSections = useMyTasksTaskSections()

  if (isMyTasksPage) {
    return {
      ...myTaskSections,
    }
  }

  return initialUseTaskSections()
}
