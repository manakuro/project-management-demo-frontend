import React, { useMemo } from 'react'
import { Center, Icon, Image } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'
import { getAttachmentIcon } from 'src/shared/attachment'
import { ChakraProps } from 'src/shared/chakra'
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

  switch (attachment.type) {
    case 1: {
      return (
        <Container label={attachment.name}>
          <Image src={attachment.src} objectFit="cover" {...style} />
        </Container>
      )
    }
    case 2:
    case 3: {
      const icon = getAttachmentIcon(attachment.type)
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
