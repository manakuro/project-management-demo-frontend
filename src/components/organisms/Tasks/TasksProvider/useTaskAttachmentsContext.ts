import { useMyTasksAttachments } from 'src/store/app/myTasksAttachments'
import { useTasksContext } from './TasksProvider'

type Result = Omit<ReturnType<typeof useMyTasksAttachments>, 'id'>
export const initialUseTaskStatus = (): Result => ({
  attachmentIds: [],
})

export const useTaskAttachmentsContext = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksAttachmentsResult = useMyTasksAttachments()

  if (isMyTasksPage) {
    return {
      ...useMyTasksAttachmentsResult,
    }
  }

  return initialUseTaskStatus()
}
