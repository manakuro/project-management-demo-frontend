import { useEffect, useMemo } from 'react'
import {
  useInboxListItem,
  useWorkspaceActivityTaskIds,
  useTaskActivityTaskIds,
} from 'src/components/organisms/Inbox/hooks'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivityType } from 'src/store/entities/activityType'

type Props = {
  listItemId?: string
}

export const useInboxList = (props: Props) => {
  const listItemId = useMemo(() => props.listItemId, [props.listItemId])
  const { router } = useRouter()
  const { setId } = useTaskDetail()
  const { listItem } = useInboxListItem(listItemId || '')
  const { isWorkspaceType, isTaskType } = useActivityType()
  const workspaceListTaskIdsResult = useWorkspaceActivityTaskIds(listItem.id)
  const myTaskListTaskIdsResult = useTaskActivityTaskIds(listItem.id)

  useEffect(() => {
    if (isInboxDetailURL(router)) return
    if (!listItemId) return

    if (isWorkspaceType(listItem.type)) {
      setId(workspaceListTaskIdsResult.taskIds[0])
    }
    if (isTaskType(listItem.type)) {
      setId(myTaskListTaskIdsResult.taskIds[0])
    }
  }, [
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    router,
    setId,
    myTaskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
  ])
}
