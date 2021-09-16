import React, { memo, useCallback, useMemo } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import { isMyTasksDetailURLById, useRouter } from 'src/router'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const ViewDetails: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props
  const { onClose } = useTaskDetailDrawer()
  const { navigateToMyTasksBoard, navigateToTaskDetail, router } = useRouter()
  const isOpen = useMemo(
    () => isMyTasksDetailURLById(router, props.taskId),
    [props.taskId, router],
  )

  const handleClick = useCallback(async () => {
    if (isOpen) {
      await navigateToMyTasksBoard()
      await onClose()
    } else {
      await navigateToTaskDetail(props.taskId)
    }
    onCloseMenu()
  }, [
    isOpen,
    navigateToMyTasksBoard,
    navigateToTaskDetail,
    onClose,
    onCloseMenu,
    props.taskId,
  ])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="detail" color="text.muted" />}
      onClick={handleClick}
    >
      {isOpen ? 'Close details' : 'View details'}
    </MenuItem>
  )
})

ViewDetails.displayName = 'ViewDetails'
