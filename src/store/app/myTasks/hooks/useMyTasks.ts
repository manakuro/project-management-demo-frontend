import { useMyTasksTaskSectionIds } from 'src/store/app/myTasks/taskSections'
import { useMyTasksTaskIds } from '../tasks'

export const useMyTasks = () => {
  const { taskSectionIds } = useMyTasksTaskSectionIds()
  const { taskIds } = useMyTasksTaskIds()

  return {
    taskSectionIds,
    taskIds,
  }
}
