import { useMyTasksTaskSections } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSections } from 'src/store/app/projects/taskSections'
import { TaskSection } from 'src/store/entities/taskSection'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSections: TaskSection[]
}

export const useTasksTaskSections = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasksTaskSections()
  const projects = useProjectsTaskSections()

  if (isMyTasksPage) {
    return {
      taskSections: myTasks.taskSections,
    }
  }

  return {
    taskSections: projects.taskSections,
  }
}
