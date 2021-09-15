import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useInboxContext } from '../../Inbox'
import { Actions, ArchiveButton } from '../Actions'
import { useInboxListItemContext } from '../Provider'

type Props = FlexProps

export const ActionButtons: React.FC<Props> = memo<Props>(() => {
  const { isHovering } = useInboxListItemContext()
  const { isArchive } = useInboxContext()

  if (isArchive) return null

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      <ArchiveButton tooltipProps={{ label: 'Archive All' }} />
    </Actions>
  )
})

ActionButtons.displayName = 'ActionButtons'
