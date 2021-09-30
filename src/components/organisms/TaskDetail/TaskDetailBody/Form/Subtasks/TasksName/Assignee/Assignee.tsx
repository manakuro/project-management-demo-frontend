import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { PopoverAssigneeInput } from 'src/components/organisms/Popovers'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammates'
import { useAssignee } from './useAssignee'

type Props = {
  taskId: string
  assigneeId?: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { taskId, assigneeId } = props
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onAssigneeClosed, onAssigneeOpened, showIcon } = useAssignee()
  const { teammate } = useTeammate(assigneeId)

  return (
    <PopoverAssigneeInput
      taskId={taskId}
      onOpened={onAssigneeOpened}
      onClosed={onAssigneeClosed}
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
