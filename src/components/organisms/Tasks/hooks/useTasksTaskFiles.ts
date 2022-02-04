import { useMyTasksFiles } from 'src/store/app/myTasksFiles'
import { useProjectsFiles } from 'src/store/app/projectsFiles'
import { useTasksContext } from '../TasksProvider'

type Result = {
  attachmentIds: string[]
}

export const useTasksTaskFiles = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksFiles()
  const projects = useProjectsFiles()

  if (isMyTasksPage) {
    return {
      attachmentIds: myTasks.attachmentIds,
    }
  }

  return {
    attachmentIds: projects.attachmentIds,
  }
}
