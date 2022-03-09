import { useMyTasksSubTaskIds } from 'src/store/app/myTasks/tasks'
import { useProjectSubTaskIds } from 'src/store/app/projects/tasks'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskIds: string[]
}

export const useTasksSubTaskIds = (taskParentId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksSubTaskIds(taskParentId)
  const projects = useProjectSubTaskIds(taskParentId)

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    }
  }

  return {
    taskIds: projects.taskIds,
  }
}
