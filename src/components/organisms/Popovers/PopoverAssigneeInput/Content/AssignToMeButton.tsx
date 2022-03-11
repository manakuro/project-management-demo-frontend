import React, { useCallback } from 'react'
import { Button } from 'src/components/atoms'
import { PopoverProps } from 'src/components/organisms/Popover'
import { useMe } from 'src/store/entities/me'
import { useTaskCommand } from 'src/store/entities/task'

type Props = {
  taskId: string
  onClose: () => void
} & PopoverProps

export const AssignToMeButton: React.FC<Props> = (props) => {
  const { onClose, taskId } = props
  const { assignTask } = useTaskCommand()
  const { me } = useMe()

  const handleAssignMe = useCallback(async () => {
    onClose()
    await assignTask({ id: taskId, assigneeId: me.id })
  }, [assignTask, me.id, onClose, taskId])

  return (
    <Button size="sm" variant="outline" onClick={handleAssignMe}>
      Assign to me
    </Button>
  )
}
AssignToMeButton.displayName = 'AssignToMeButton'
