import React, { memo } from 'react'
import { useInboxContext } from 'src/components/features/organisms/Inbox'
import { IconButtonProps } from 'src/components/ui/atoms'
import { ArchiveButton } from './ArchiveButton'
import { MoveToInboxButton } from './MoveToInboxButton'

type Props = {
  taskId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ActionButton: React.FC<Props> = memo<Props>((props) => {
  const { isActivity } = useInboxContext()

  if (isActivity) {
    return <ArchiveButton {...props} />
  }

  return <MoveToInboxButton {...props} />
})

ActionButton.displayName = 'ActionButton'
