import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useInboxContext } from 'src/components/organisms/Inbox'
import { Actions, ArchiveButton, MoveToInboxButton } from '../Actions'
import { useInboxListItemContext } from '../Provider'

type Props = FlexProps

export const ActionButtons: React.FC<Props> = memo<Props>(() => {
  const { isHovering } = useInboxListItemContext()
  const { isArchive, isActivity } = useInboxContext()

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      {isActivity && (
        <ArchiveButton
          isDisabled
          tooltipProps={{ label: 'Archive notification' }}
        />
      )}
      {isArchive && (
        <MoveToInboxButton
          isDisabled
          tooltipProps={{ label: 'Move to Inbox' }}
        />
      )}
    </Actions>
  )
})

ActionButtons.displayName = 'ActionButtons'
