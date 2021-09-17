import { useMyTaskTask } from 'src/store/app/myTasks/tasks'
import { Task } from 'src/store/entities/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: Partial<Task>) => string
}

export const initialUseTask = (): Result => ({
  addTask: () => '',
})

export const useTaskFromTasks = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTaskTask = useMyTaskTask()

  if (isMyTasksPage) {
    return {
      addTask: myTaskTask.addTask,
    }
  }

  return initialUseTask()
}
