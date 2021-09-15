import { useTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/taskActivityTasks'
import { useInboxContext } from '../../Inbox'

type Result = {
  taskIds: string[]
}

export const useTaskListTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext()
  const useWorkspaceActivityTasksTaskIdsResult =
    useTaskActivityTasksTaskIds(listItemId)

  if (isActivity) {
    return {
      taskIds: useWorkspaceActivityTasksTaskIdsResult.taskIds,
    }
  }

  return {
    taskIds: [],
  }
}
