import { useMyTasksTask } from 'src/store/app/myTasks/tasks'
import { useProjectsTask } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: { taskSectionId: string }) => string
}

export const useTasksTask = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskResult = useMyTasksTask()
  const useProjectsTaskResult = useProjectsTask()

  if (isMyTasksPage) {
    return {
      addTask: useMyTasksTaskResult.addTask,
    }
  }

  return {
    addTask: useProjectsTaskResult.addTask,
  }
}
