import React, { memo } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { MenuButton, AttachmentMenu } from 'src/components/organisms'

type Props = {}

export const Attachment: React.VFC<Props> = memo<Props>(() => {
  return (
    <AttachmentMenu
      label="Attach a file or paste an image"
      tooltip={{ openDelay: 500 }}
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
