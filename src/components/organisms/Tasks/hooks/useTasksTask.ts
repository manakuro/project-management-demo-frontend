import { useMyTasksTask } from 'src/store/app/myTasks/tasks'
import { useProjectsTask } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: { taskSectionId: string }) => string
}

export const useTasksTask = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksTask()
  const projects = useProjectsTask()

  if (isMyTasksPage) {
    return {
      addTask: myTasks.addTask,
    }
  }

  return {
    addTask: projects.addTask,
  }
}
