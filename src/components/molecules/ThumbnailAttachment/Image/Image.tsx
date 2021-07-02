import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Image as AtomsImage } from 'src/components/atoms'
import { Container } from 'src/components/molecules/ThumbnailAttachment/Container'
import { Menu } from 'src/components/molecules/ThumbnailAttachment/Menu'
import { MenuButton } from 'src/components/molecules/ThumbnailAttachment/MenuButton'
import { Overlay } from 'src/components/molecules/ThumbnailAttachment/Overlay'
import { useThumbnailAttachmentContext } from 'src/components/molecules/ThumbnailAttachment/Provider'
import { Tooltip } from 'src/components/molecules/ThumbnailAttachment/Tooltip'
import { useAttachment } from 'src/store/entities/attachments'

type Props = FlexProps & {
  attachmentId: string
}

export const Image: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props
  const { attachment } = useAttachment(attachmentId)
  const { isHovering } = useThumbnailAttachmentContext()

  return (
    <Tooltip attachmentId={attachmentId}>
      <Container bg="gray.50" {...rest}>
        <AtomsImage
          width="auto"
          maxH={16}
          maxW="240px"
          src={attachment.src}
          borderRadius="lg"
          objectFit="cover"
        />
        <Overlay isHovering={isHovering} />
        <Menu attachmentId={attachmentId}>
          <MenuButton color="white" light />
        </Menu>
      </Container>
    </Tooltip>
  )
}
