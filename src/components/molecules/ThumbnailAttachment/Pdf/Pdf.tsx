import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Menu } from 'src/components/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/molecules/ThumbnailAttachment/MenuButton'
import { Tooltip } from 'src/components/molecules/ThumbnailAttachment/Tooltip'
import { Container } from 'src/components/molecules/ThumbnailAttachment/Container'
import { AttachmentBox } from 'src/components/molecules'

type Props = FlexProps & {
  attachmentId: string
}

export const Pdf: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props

  return (
    <Tooltip attachmentId={attachmentId}>
      <Container {...rest}>
        <AttachmentBox size="md" attachmentId={attachmentId} />
        <Menu attachmentId={attachmentId}>
          <MenuButton color="text.muted" />
        </Menu>
      </Container>
    </Tooltip>
  )
}
