import React from 'react'
import { Image } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'
import { AttachmentBox } from 'src/components/molecules'
import { Overlay } from 'src/components/molecules/ThumbnailAttachment/Overlay'
import { useThumbnailAttachment } from 'src/components/molecules/ThumbnailAttachment/Provider'

type Props = {
  attachmentId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)
  const { isHovering } = useThumbnailAttachment()

  switch (attachment.type) {
    case 1: {
      return (
        <>
          <Image
            width="auto"
            maxH={16}
            maxW="240px"
            src={attachment.src}
            borderRadius="lg"
            objectFit="cover"
          />
          <Overlay isHovering={isHovering} />
        </>
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
