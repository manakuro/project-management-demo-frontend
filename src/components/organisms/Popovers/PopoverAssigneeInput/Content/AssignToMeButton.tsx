import React, { useCallback } from 'react'
import { Button } from 'src/components/atoms'
import { PopoverProps } from 'src/components/organisms/Popover'
import { useMe } from 'src/store/entities/me'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  onClose: () => void
} & PopoverProps

export const AssignToMeButton: React.FC<Props> = (props) => {
  const { onClose, taskId } = props
  const { setTask } = useTask(taskId)
  const { me } = useMe()

  const handleAssignMe = useCallback(async () => {
    await setTask({ assigneeId: me.id })
    onClose()
  }, [me.id, onClose, setTask])

  return (
    <Button size="sm" variant="outline" onClick={handleAssignMe}>
      Assign to me
    </Button>
  )
}
AssignToMeButton.displayName = 'AssignToMeButton'
