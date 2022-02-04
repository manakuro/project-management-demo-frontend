import React, { useMemo } from 'react'
import { Center, Icon, Image } from 'src/components/atoms'
import { FileTypeCode } from 'src/graphql/enums'
import { ChakraProps } from 'src/shared/chakra'
import {
  useAttachment,
  getAttachmentIcon,
} from 'src/store/entities/attachments'
import { Container } from './Container'

type Props = {
  attachmentId: string
}

export const ThumbnailListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)
  const style = useMemo<ChakraProps>(
    () => ({
      bg: 'gray.50',
      borderRadius: 'md',
      h: 'full',
      w: 'full',
    }),
    [],
  )

  switch (attachment.fileType.typeCode) {
    case FileTypeCode.Image: {
      return (
        <Container label={attachment.name}>
          <Image src={attachment.src} objectFit="cover" {...style} />
        </Container>
      )
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      const icon = getAttachmentIcon(attachment.fileType.typeCode)
      return (
        <Container label={attachment.name}>
          <Center {...style}>
            <Icon icon={icon} color="primary" />
          </Center>
        </Container>
      )
    }
  }
}
