import React from 'react'
import { Image } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'
import { AttachmentBox } from 'src/components/molecules'

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
          width="auto"
          maxH={16}
          maxW="240px"
          src={attachment.src}
          borderRadius="lg"
          objectFit="cover"
        />
      )
    }
    case 2: {
      return <AttachmentBox size="md" attachmentId={attachmentId} />
    }
    case 3: {
      return (
        <Image
          width="auto"
          maxH={16}
          maxW="240px"
          src={attachment.src}
          borderRadius="lg"
          objectFit="cover"
        />
      )
    }
  }
}
