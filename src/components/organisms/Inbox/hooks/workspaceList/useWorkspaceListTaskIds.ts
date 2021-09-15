import { useWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { useArchivedWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/archive/archivedWorkspaceActivityTasks'
import { useInboxContext } from '../../Inbox'

type Result = {
  taskIds: string[]
}

export const useWorkspaceListTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext()
  const useWorkspaceActivityTasksTaskIdsResult =
    useWorkspaceActivityTasksTaskIds(listItemId)
  const useArchivedWorkspaceActivityTasksTaskIdsResult =
    useArchivedWorkspaceActivityTasksTaskIds(listItemId)

  if (isActivity) {
    return {
      taskIds: useWorkspaceActivityTasksTaskIdsResult.taskIds,
    }
  }

  return {
    taskIds: useArchivedWorkspaceActivityTasksTaskIdsResult.taskIds,
  }
}
