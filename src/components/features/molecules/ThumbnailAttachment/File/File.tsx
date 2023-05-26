import React from 'react'
import { AttachmentBox } from 'src/components/features/molecules/AttachmentBox'
import { Container } from 'src/components/features/molecules/ThumbnailAttachment/Container'
import { Menu } from 'src/components/features/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/features/molecules/ThumbnailAttachment/MenuButton'
import { useThumbnailAttachmentContext } from 'src/components/features/molecules/ThumbnailAttachment/Provider'
import { Tooltip } from 'src/components/features/molecules/ThumbnailAttachment/Tooltip'
import { FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps & {
  taskFileId: string
}

export const File: React.FC<Props> = (props) => {
  const { taskFileId, ...rest } = props
  const { isHovering } = useThumbnailAttachmentContext()

  return (
    <Tooltip taskFileId={taskFileId} openDelay={500}>
      <Container {...rest}>
        <AttachmentBox
          size="md"
          taskFileId={taskFileId}
          isHovering={isHovering}
        />
        <Menu taskFileId={taskFileId}>
          <MenuButton color="text.muted" />
        </Menu>
      </Container>
    </Tooltip>
  )
}
