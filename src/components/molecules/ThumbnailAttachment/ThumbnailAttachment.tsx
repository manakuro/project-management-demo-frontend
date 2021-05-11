import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { ThumbnailMenu } from './ThumbnailMenu'
import { useAttachment } from 'src/store/attachments'
import { ThumbnailListItem } from './ThrumbnailListItem'
import { MenuButton } from './MenuButton'
import { ThumbnailAttachmentProvider } from './ThumbnailAttachmentProvider'
import { Tooltip } from './Tooltip'
import { Container } from './Container'

type Props = FlexProps & {
  attachmentId: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props
  const { attachment } = useAttachment(attachmentId)

  return (
    <ThumbnailAttachmentProvider>
      <Tooltip attachmentId={attachmentId}>
        <Container {...rest}>
          <ThumbnailListItem attachmentId={attachmentId} />
          <ThumbnailMenu src={attachment.src}>
            <MenuButton light />
          </ThumbnailMenu>
        </Container>
      </Tooltip>
    </ThumbnailAttachmentProvider>
  )
}
