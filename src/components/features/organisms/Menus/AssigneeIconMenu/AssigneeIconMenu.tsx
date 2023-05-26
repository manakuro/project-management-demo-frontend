import React, { memo, useCallback, useState } from 'react'
import { PopoverAssigneeInput } from 'src/components/features/organisms/Popovers'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { Icon } from 'src/components/ui/atoms'
import { Tooltip } from 'src/components/ui/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammate'

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
  const [showProfile, setShowProfile] = useState(true)

  const handleOpened = useCallback(() => {
    setShowProfile(false)
    onAssigneeOpened()
  }, [onAssigneeOpened])

  const handleClosed = useCallback(() => {
    onAssigneeClosed()
    setShowProfile(true)
  }, [onAssigneeClosed])

  return (
    <PopoverAssigneeInput
      taskId={taskId}
      onOpened={handleOpened}
      onClosed={handleClosed}
    >
      {teammate.id ? (
        <TeammateAvatar
          teammateId={teammate.id}
          size="xs"
          ignoreFallback
          showProfile={showProfile}
        />
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
