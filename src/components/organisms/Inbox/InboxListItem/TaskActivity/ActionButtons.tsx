import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { Actions, ArchiveButton } from '../Actions'
import { useInboxListItemContext } from '../Provider'

type Props = FlexProps

export const ActionButtons: React.FC<Props> = memo<Props>(() => {
  const { isHovering } = useInboxListItemContext()

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      <ArchiveButton tooltipProps={{ label: 'Archive notification' }} />
    </Actions>
  )
})

ActionButtons.displayName = 'ActionButtons'
