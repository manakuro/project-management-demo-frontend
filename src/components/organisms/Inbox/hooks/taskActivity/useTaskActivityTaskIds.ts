import { useTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/taskActivityTasks'
import { useArchivedMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/archive/archivedMyTaskActivityTasks'
import { useInboxContext } from '../../Inbox'

type Result = {
  taskIds: string[]
}

export const useTaskActivityTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext()
  const activity = useTaskActivityTasksTaskIds(listItemId)
  const archived = useArchivedMyTaskActivityTasksTaskIds(listItemId)

  if (isActivity) {
    return {
      taskIds: activity.taskIds,
    }
  }

  return {
    taskIds: archived.taskIds,
  }
}
