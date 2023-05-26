import { useMyTasksTaskSections } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSections } from 'src/store/app/projects/taskSections'
import { ProjectTaskSection } from 'src/store/entities/projectTaskSection'
import { TeammateTaskSection } from 'src/store/entities/teammatesTaskSection'
import { useTasksContext } from '../TasksProvider'

export type TaskSection = TeammateTaskSection | ProjectTaskSection

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
