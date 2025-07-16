import type React from 'react'
import { memo, useCallback, useMemo } from 'react'
import { useTaskDetailDrawer } from 'src/components/features/organisms/TaskDetails'
import { useTasksRouter } from 'src/components/features/organisms/Tasks/hooks'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const ViewDetails: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props
  const { onClose } = useTaskDetailDrawer()
  const { navigateToTaskDetail, navigateToTaskBoard, isTaskDetailURLById } =
    useTasksRouter()
  const isOpen = useMemo(
    () => isTaskDetailURLById(props.taskId),
    [isTaskDetailURLById, props.taskId],
  )

  const handleClick = useCallback(async () => {
    if (isOpen) {
      await navigateToTaskBoard()
      await onClose()
    } else {
      await navigateToTaskDetail(props.taskId)
    }
    onCloseMenu()
  }, [
    isOpen,
    navigateToTaskBoard,
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
