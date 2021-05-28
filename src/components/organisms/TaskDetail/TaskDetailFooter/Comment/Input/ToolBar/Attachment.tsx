import React, { memo } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { MenuButton, AttachmentMenu } from 'src/components/organisms'
import { useInput } from 'src/components/organisms/TaskDetail/TaskDetailFooter/Comment/Input/Provider'

type Props = {}

export const Attachment: React.VFC<Props> = memo<Props>(() => {
  const { onUploadFile } = useInput()

  return (
    <AttachmentMenu
      label="Attach a file or paste an image"
      tooltip={{ openDelay: 500 }}
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
