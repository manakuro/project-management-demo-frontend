import { useMyTasksFiles } from 'src/store/app/myTasksFiles'
import { useProjectsFiles } from 'src/store/app/projectsFiles'
import { useTasksContext } from '../TasksProvider'

type Result = {
  attachmentIds: string[]
}

export const useTasksTaskFiles = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksFilesResult = useMyTasksFiles()
  const useProjectsFilesResult = useProjectsFiles()

  if (isMyTasksPage) {
    return useMyTasksFilesResult
  }

  return useProjectsFilesResult
}
