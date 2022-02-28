import { useMyTasksTaskSectionCommand } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSectionCommand } from 'src/store/app/projects/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTaskSection: () => Promise<string>
  deleteTaskSectionAndKeepTask: (id: string) => Promise<void>
  deleteTaskSectionAndDeleteTask: (id: string) => Promise<void>
}

export const useTasksTaskSectionCommand = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasksTaskSectionCommand()
  const projects = useProjectsTaskSectionCommand()

  if (isMyTasksPage) {
    return {
      addTaskSection: myTasks.addTaskSection,
      deleteTaskSectionAndKeepTask: myTasks.deleteTaskSectionAndKeepTask,
      deleteTaskSectionAndDeleteTask: myTasks.deleteTaskSectionAndDeleteTask,
    }
  }

  return {
    addTaskSection: projects.addTaskSection,
    deleteTaskSectionAndKeepTask: async () => {},
    deleteTaskSectionAndDeleteTask: async () => {},
  }
}
