import React, { useCallback } from 'react'
import { FlexProps } from 'src/components/atoms'
import { Provider } from './Provider'
import { Attachment, useAttachment } from 'src/store/entities/attachments'
import { Image } from './Image'
import { File } from './File'

type Props = FlexProps & {
  attachmentId: string
  onOpenFileViewer: (attachmentId: string) => void
  onDelete: (attachment: Attachment) => void
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
}

export const Component: React.VFC<Props> = (props) => {
  const { attachmentId, onOpenFileViewer, onDelete, ...rest } = props
  const { attachment } = useAttachment(attachmentId)

  const handleClick = useCallback(() => {
    onOpenFileViewer(attachmentId)
  }, [attachmentId, onOpenFileViewer])

  switch (attachment.type) {
    case 1: {
      return (
        <Image onClick={handleClick} attachmentId={attachmentId} {...rest} />
      )
    }
    case 2:
    case 3: {
      return (
        <File onClick={handleClick} attachmentId={attachmentId} {...rest} />
      )
    }
  }
}
