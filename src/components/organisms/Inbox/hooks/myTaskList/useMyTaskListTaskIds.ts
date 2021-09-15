import { useMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/myTaskActivityTasks'
import { useArchivedMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/archive/archivedMyTaskActivityTasks'
import { useInboxContext } from '../../Inbox'

type Result = {
  taskIds: string[]
}

export const useMyTaskListTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext()
  const useMyTaskActivityTasksTaskIdsResult =
    useMyTaskActivityTasksTaskIds(listItemId)
  const useArchivedMyTaskActivityTasksTaskIdsResult =
    useArchivedMyTaskActivityTasksTaskIds(listItemId)

  if (isActivity) {
    return {
      taskIds: useMyTaskActivityTasksTaskIdsResult.taskIds,
    }
  }

  return {
    taskIds: useArchivedMyTaskActivityTasksTaskIdsResult.taskIds,
  }
}
