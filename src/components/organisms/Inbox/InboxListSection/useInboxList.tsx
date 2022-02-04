import { useEffect, useMemo } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivity } from 'src/store/app/inbox/activity/activities'
import { useMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/myTaskActivityTasks'
import { useWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { useActivityType } from 'src/store/entities/activityType'

type Props = {
  activityId?: string
}

export const useInboxList = (props: Props) => {
  const activityId = useMemo(() => props.activityId, [props.activityId])
  const { router } = useRouter()
  const { setId } = useTaskDetail()
  const { activity } = useActivity(activityId || '')
  const { isWorkspaceType, isTaskType } = useActivityType()
  const workspaceActivityTasksTaskIdsResult = useWorkspaceActivityTasksTaskIds(
    activity.id,
  )
  const taskActivityTasksTaskIdsResult = useMyTaskActivityTasksTaskIds(
    activity.id,
  )

  useEffect(() => {
    if (isInboxDetailURL(router)) return
    if (!activityId) return

    if (isWorkspaceType(activity.type)) {
      setId(workspaceActivityTasksTaskIdsResult.taskIds[0])
    }
    if (isTaskType(activity.type)) {
      setId(taskActivityTasksTaskIdsResult.taskIds[0])
    }
  }, [
    activityId,
    activity.type,
    isTaskType,
    isWorkspaceType,
    router,
    setId,
    taskActivityTasksTaskIdsResult.taskIds,
    workspaceActivityTasksTaskIdsResult.taskIds,
  ])
}
