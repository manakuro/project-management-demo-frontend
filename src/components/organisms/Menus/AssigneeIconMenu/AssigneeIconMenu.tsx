import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { PopoverAssigneeInput } from 'src/components/organisms/Popovers'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  taskId: string
  assigneeId: string
  onAssigneeOpened: () => void
  onAssigneeClosed: () => void
  showIcon: boolean
}

export const AssigneeIconMenu: React.FC<Props> = memo<Props>((props) => {
  const { taskId, assigneeId, onAssigneeClosed, onAssigneeOpened, showIcon } =
    props
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { teammate } = useTeammate(assigneeId)

  const handleOpened = useCallback(() => {
    onAssigneeOpened()
  }, [onAssigneeOpened])

  const handleClosed = useCallback(() => {
    onAssigneeClosed()
  }, [onAssigneeClosed])

  return (
    <PopoverAssigneeInput
      taskId={taskId}
      onOpened={handleOpened}
      onClosed={handleClosed}
    >
      {teammate.id ? (
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      ) : (
        <Tooltip
          hasArrow
          label="Assign this task"
          aria-label="Assign this task"
          size="sm"
          withIcon
        >
          <Icon
            visibility={showIcon ? 'visible' : 'hidden'}
            pointerEvents={showIcon ? 'auto' : 'none'}
            icon="user"
            color="text.muted"
            {...clickableHoverLightStyle}
          />
        </Tooltip>
      )}
    </PopoverAssigneeInput>
  )
})
AssigneeIconMenu.displayName = 'AssigneeIconMenu'
