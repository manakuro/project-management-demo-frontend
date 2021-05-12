import React from 'react'
import { Image } from 'src/components/atoms'
import { useAttachment } from 'src/store/attachments'

type Props = {
  attachmentId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { attachmentId } = props
  const { attachment } = useAttachment(attachmentId)

  switch (attachment.type) {
    case 1: {
      return <Image src={attachment.src} objectFit="contain" />
    }
    case 2:
    case 3: {
      return <Image src={attachment.src} objectFit="contain" />
    }
  }
}
