import React from 'react'
import { FlexProps } from 'src/components/ui/atoms'
import { AttachmentBox } from 'src/components/ui/molecules'
import { Container } from 'src/components/ui/molecules/ThumbnailAttachment/Container'
import { Menu } from 'src/components/ui/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/ui/molecules/ThumbnailAttachment/MenuButton'
import { useThumbnailAttachmentContext } from 'src/components/ui/molecules/ThumbnailAttachment/Provider'
import { Tooltip } from 'src/components/ui/molecules/ThumbnailAttachment/Tooltip'

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
