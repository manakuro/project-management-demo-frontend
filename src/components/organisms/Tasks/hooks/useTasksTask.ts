import { useMyTasksTask } from 'src/store/app/myTasks/tasks'
import { useProjectsTask } from 'src/store/app/projects/tasks'
import { Task } from 'src/store/entities/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: Partial<Task>) => string
}

export const initialValue = (): Result => ({
  addTask: () => '',
})

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
