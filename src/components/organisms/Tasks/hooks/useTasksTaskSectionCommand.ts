import { useMyTasksTaskSectionCommand } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSectionCommand } from 'src/store/app/projects/taskSections'
import { DeleteProjectTaskSectionAndKeepTasksMutation } from 'src/store/entities/projectTaskSection'
import { DeleteTeammateTaskSectionAndKeepTasksMutation } from 'src/store/entities/teammatesTaskSection'
import { useTasksContext } from '../TasksProvider'

export type DeleteTaskSectionAndKeepTasksResponse =
  | DeleteTeammateTaskSectionAndKeepTasksMutation
  | DeleteProjectTaskSectionAndKeepTasksMutation

type Result = {
  addTaskSection: () => Promise<string>
  deleteTaskSectionAndKeepTasks: (
    id: string,
  ) => Promise<DeleteTaskSectionAndKeepTasksResponse | null | undefined>
  deleteTaskSectionAndDeleteTasks: (id: string) => Promise<void>
  deleteTaskSection: (id: string) => Promise<void>
  undeleteTaskSectionAndKeepTasks: (
    val: DeleteTaskSectionAndKeepTasksResponse,
  ) => Promise<void>
}

export const useTasksTaskSectionCommand = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasksTaskSectionCommand()
  const projects = useProjectsTaskSectionCommand()

  if (isMyTasksPage) {
    return {
      addTaskSection: myTasks.addTaskSection,
      deleteTaskSectionAndKeepTasks: myTasks.deleteTaskSectionAndKeepTasks,
      deleteTaskSectionAndDeleteTasks: myTasks.deleteTaskSectionAndDeleteTasks,
      deleteTaskSection: myTasks.deleteTeammateTaskSection,
      undeleteTaskSectionAndKeepTasks:
        myTasks.undeleteTaskSectionAndKeepTasks as Result['undeleteTaskSectionAndKeepTasks'],
    }
  }

  return {
    addTaskSection: projects.addTaskSection,
    deleteTaskSectionAndKeepTasks: projects.deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks: projects.deleteTaskSectionAndDeleteTasks,
    deleteTaskSection: projects.deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks: async () => {},
  }
}
