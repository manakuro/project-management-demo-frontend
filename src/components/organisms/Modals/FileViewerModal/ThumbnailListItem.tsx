import React from 'react'
import { Center, Icon, Image } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'
import { getAttachmentIcon } from 'src/shared/attachment'

type Props = {
  attachmentId: string
}

export const ThumbnailListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)

  switch (attachment.type) {
    case 1: {
      return (
        <Image
          src={attachment.src}
          bg="gray.50"
          h="100%"
          objectFit="cover"
          borderRadius="md"
        />
      )
    }
    case 2:
    case 3: {
      const icon = getAttachmentIcon(attachment.type)
      return (
        <Center bg="gray.50" borderRadius="md" w="full" h="full">
          <Icon icon={icon} color="primary" />
        </Center>
      )
    }
  }
}
