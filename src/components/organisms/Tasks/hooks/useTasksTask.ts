import { useMyTasksTask } from 'src/store/app/myTasks/tasks'
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
  const myTaskTask = useMyTasksTask()

  if (isMyTasksPage) {
    return {
      addTask: myTaskTask.addTask,
    }
  }

  return initialValue()
}
