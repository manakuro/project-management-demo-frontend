import { useEffect, useMemo } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivity } from 'src/store/app/inbox/activity/activities'
import { useWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { useActivityTypes } from 'src/store/entities/activityTypes'

type Props = {
  activityId: string
}

export const useInboxList = (props: Props) => {
  const activityId = useMemo(() => props.activityId, [props.activityId])
  const { router } = useRouter()
  const { setId } = useTaskDetail()
  const { activity } = useActivity(activityId)
  const { isWorkspaceType } = useActivityTypes()
  const workspaceActivityTasksTaskIdsResult = useWorkspaceActivityTasksTaskIds(
    activity.id,
  )

  useEffect(() => {
    if (isInboxDetailURL(router)) return
    if (isWorkspaceType(activity.type)) {
      setId(workspaceActivityTasksTaskIdsResult.taskIds[0])
    }
  }, [
    activity.type,
    isWorkspaceType,
    router,
    setId,
    workspaceActivityTasksTaskIdsResult.taskIds,
  ])
}
