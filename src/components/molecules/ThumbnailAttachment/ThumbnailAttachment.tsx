import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Provider } from './Provider'
import { useAttachment } from 'src/store/attachments'
import { Image } from './Image'
import { File } from './File'

type Props = FlexProps & {
  attachmentId: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

export const Component: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props
  const { attachment } = useAttachment(attachmentId)

  switch (attachment.type) {
    case 1: {
      return <Image attachmentId={attachmentId} {...rest} />
    }
    case 2:
    case 3: {
      return <File attachmentId={attachmentId} {...rest} />
    }
  }
}
