import { useEffect, useMemo } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivity } from 'src/store/app/inbox/activity/activities'
import { useTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/taskActivityTasks'
import { useWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { useActivityTypes } from 'src/store/entities/activityTypes'

type Props = {
  activityId?: string
}

export const useInboxList = (props: Props) => {
  const activityId = useMemo(() => props.activityId, [props.activityId])
  const { router } = useRouter()
  const { setId } = useTaskDetail()
  const { activity } = useActivity(activityId || '')
  const { isWorkspaceType, isTaskType } = useActivityTypes()
  const workspaceActivityTasksTaskIdsResult = useWorkspaceActivityTasksTaskIds(
    activity.id,
  )
  const taskActivityTasksTaskIdsResult = useTaskActivityTasksTaskIds(
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
