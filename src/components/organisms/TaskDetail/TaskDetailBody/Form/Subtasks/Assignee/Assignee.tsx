import React, { memo } from 'react'
import { Avatar, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { PopoverAssigneeInput, PopoverProfile } from 'src/components/organisms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammates'
import { useAssignee } from './useAssignee'

type Props = {
  assigneeId?: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onAssigneeClosed, onAssigneeOpened, showIcon } = useAssignee()
  const { teammate } = useTeammate(props.assigneeId)

  if (teammate.id) {
    return (
      <PopoverProfile
        profile={{
          name: teammate.name,
          image: teammate.image,
          email: teammate.email,
        }}
      >
        <Avatar
          name={teammate.name}
          src={teammate.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
      </PopoverProfile>
    )
  }

  return (
    <PopoverAssigneeInput
      onChange={() => {}}
      onOpened={onAssigneeOpened}
      onClosed={onAssigneeClosed}
    >
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
    </PopoverAssigneeInput>
  )
})
