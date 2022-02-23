import { useMyTasksTask } from 'src/store/app/myTasks/tasks'
import { useProjectsTask } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: { taskSectionId: string }) => Promise<string>
  deleteTask: (val: { taskId: string }) => Promise<string>
}

export const useTasksTask = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksTask()
  const projects = useProjectsTask()

  if (isMyTasksPage) {
    return {
      addTask: myTasks.addTask,
      deleteTask: myTasks.deleteTask,
    }
  }

  return {
    addTask: projects.addTask,
    deleteTask: async () => '',
  }
}
