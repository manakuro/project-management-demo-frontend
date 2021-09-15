import { useEffect, useMemo } from 'react'
import {
  useInboxListItem,
  useWorkspaceListTaskIds,
  useTaskListTaskIds,
} from 'src/components/organisms/Inbox'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivityTypes } from 'src/store/entities/activityTypes'

type Props = {
  listItemId?: string
}

export const useInboxList = (props: Props) => {
  const listItemId = useMemo(() => props.listItemId, [props.listItemId])
  const { router } = useRouter()
  const { setId } = useTaskDetail()
  const { listItem } = useInboxListItem(listItemId || '')
  const { isWorkspaceType, isTaskType } = useActivityTypes()
  const workspaceListTaskIdsResult = useWorkspaceListTaskIds(listItem.id)
  const taskListTaskIdsResult = useTaskListTaskIds(listItem.id)

  useEffect(() => {
    if (isInboxDetailURL(router)) return
    if (!listItemId) return

    if (isWorkspaceType(listItem.type)) {
      setId(workspaceListTaskIdsResult.taskIds[0])
    }
    if (isTaskType(listItem.type)) {
      setId(taskListTaskIdsResult.taskIds[0])
    }
  }, [
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    router,
    setId,
    taskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
  ])
}
