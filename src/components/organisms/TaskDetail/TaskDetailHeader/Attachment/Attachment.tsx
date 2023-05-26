import React, { memo } from 'react'
import { MenuButton } from 'src/components/organisms/Menu'
import { AttachmentMenu } from 'src/components/organisms/Menus'
import { Icon, IconButton } from 'src/components/ui/atoms'

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
