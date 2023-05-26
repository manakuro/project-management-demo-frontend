import React, { memo } from 'react'
import { AttachmentMenu } from 'src/components/organisms/Menus'
import { Icon, IconButton } from 'src/components/ui/atoms'
import { MenuButton } from 'src/components/ui/organisms/Menu'
import { useInputContext } from '../Provider'

type Props = {}

export const Attachment: React.FC<Props> = memo<Props>(() => {
  const { onUploadFile } = useInputContext()

  return (
    <AttachmentMenu
      label={
        'Attach a file or paste an image. (This file will not be persisted in database.) '
      }
      tooltip={{ openDelay: 500, textAlign: 'left', size: 'md' }}
      onUpload={onUploadFile}
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
