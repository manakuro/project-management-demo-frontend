import React, { memo } from 'react'
import { AttachmentMenu } from 'src/components/features/organisms/Menus'
import { Icon, IconButton } from 'src/components/ui/atoms'
import { MenuButton } from 'src/components/ui/organisms/Menu'

type Props = {}

export const Attachment: React.FC<Props> = memo<Props>(() => {
  return (
    <AttachmentMenu
      label="Add a file to this task. This file will not be persisted in database."
      tooltip={{ textAlign: 'left', size: 'md' }}
    >
      <MenuButton
        aria-label="Attachment button"
        as={IconButton}
        icon={<Icon icon="attach" color="text.muted" />}
        size="sm"
        variant="ghost"
      />
    </AttachmentMenu>
  )
})
Attachment.displayName = 'Attachment'
