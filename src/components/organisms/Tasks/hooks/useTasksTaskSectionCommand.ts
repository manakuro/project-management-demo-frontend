import { useMyTasksTaskSectionCommand } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSectionCommand } from 'src/store/app/projects/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  addTaskSection: () => Promise<string>
  deleteTaskSectionAndKeepTasks: (id: string) => Promise<void>
  deleteTaskSectionAndDeleteTasks: (id: string) => Promise<void>
}

export const useTasksTaskSectionCommand = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasksTaskSectionCommand()
  const projects = useProjectsTaskSectionCommand()

  if (isMyTasksPage) {
    return {
      addTaskSection: myTasks.addTaskSection,
      deleteTaskSectionAndKeepTasks: myTasks.deleteTaskSectionAndKeepTasks,
      deleteTaskSectionAndDeleteTasks: myTasks.deleteTaskSectionAndDeleteTask,
    }
  }

  return {
    addTaskSection: projects.addTaskSection,
    deleteTaskSectionAndKeepTasks: async () => {},
    deleteTaskSectionAndDeleteTasks: async () => {},
  }
}
