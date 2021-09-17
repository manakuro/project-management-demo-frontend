import { useMyTasksFiles } from 'src/store/app/myTasksFiles'
import { useTasksContext } from '../TasksProvider'

type Result = Omit<ReturnType<typeof useMyTasksFiles>, 'id'>
export const initialValue = (): Result => ({
  attachmentIds: [],
})

export const useTasksTaskFiles = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksFilesResult = useMyTasksFiles()

  if (isMyTasksPage) {
    return {
      ...useMyTasksFilesResult,
    }
  }

  return initialValue()
}
