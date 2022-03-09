import { useMyTasksSubTask } from 'src/store/app/myTasks/tasks'
import { useProjectSubTask } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTask: (val: { taskParentId: string }) => Promise<string>
}

export const useTasksSubTask = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksSubTask()
  const projects = useProjectSubTask()

  if (isMyTasksPage) {
    return {
      addTask: myTasks.addTask,
    }
  }

  return {
    addTask: projects.addTask,
  }
}
