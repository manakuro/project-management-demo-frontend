import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Menu } from 'src/components/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/molecules/ThumbnailAttachment/MenuButton'
import { Tooltip } from 'src/components/molecules/ThumbnailAttachment/Tooltip'
import { Container } from 'src/components/molecules/ThumbnailAttachment/Container'
import { AttachmentBox } from 'src/components/molecules'
import { useThumbnailAttachment } from 'src/components/molecules/ThumbnailAttachment/Provider'

type Props = FlexProps & {
  attachmentId: string
}

export const File: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props
  const { isHovering } = useThumbnailAttachment()

  return (
    <Tooltip attachmentId={attachmentId} openDelay={500}>
      <Container {...rest}>
        <AttachmentBox
          size="md"
          attachmentId={attachmentId}
          isHovering={isHovering}
        />
        <Menu attachmentId={attachmentId}>
          <MenuButton color="text.muted" />
        </Menu>
      </Container>
    </Tooltip>
  )
}
