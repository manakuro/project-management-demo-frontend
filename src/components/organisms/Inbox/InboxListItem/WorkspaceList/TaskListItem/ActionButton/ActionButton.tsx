import React, { memo } from 'react'
import { IconButtonProps } from 'src/components/atoms'
import { useInboxContext } from 'src/components/organisms/Inbox'
import { ArchiveButton } from './ArchiveButton'
import { MoveToInboxButton } from './MoveToInboxButton'

type Props = {
  taskId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ActionButton: React.VFC<Props> = memo<Props>((props) => {
  const { isActivity } = useInboxContext()

  if (isActivity) {
    return <ArchiveButton {...props} />
  }

  return <MoveToInboxButton {...props} />
})

ActionButton.displayName = 'ActionButton'
