import React, { memo } from 'react'
import { Avatar, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { PopoverAssigneeInput, PopoverProfile } from 'src/components/organisms'
import { useAssignee } from './useAssignee'

type Props = {
  profileId?: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onAssigneeClosed, onAssigneeOpened, showIcon } = useAssignee()

  if (props.profileId) {
    return (
      <PopoverProfile
        profile={{
          name: 'Manato Kuroda',
          image: '/images/cat_img.png',
          email: 'manato.kuroda@gmail.com',
        }}
      >
        <Avatar
          name="Manato Kuroda"
          src="/images/cat_img.png"
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
      {showIcon && (
        <Tooltip
          hasArrow
          label="Assign this task"
          aria-label="Assign this task"
          size="sm"
          withIcon
        >
          <Icon icon="user" color="text.muted" {...clickableHoverLightStyle} />
        </Tooltip>
      )}
    </PopoverAssigneeInput>
  )
})
