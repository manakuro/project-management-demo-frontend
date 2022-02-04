import React, { memo, useCallback } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TaskFile, useAttachment } from 'src/store/entities/attachments'
import { FileTypeCode } from 'src/store/entities/fileTypes'
import { File } from './File'
import { Image } from './Image'
import { Provider } from './Provider'

type Props = FlexProps & {
  attachmentId: string
  onOpenFileViewer: (attachmentId: string) => void
  onDelete: (attachment: TaskFile) => void
}

export const ThumbnailAttachment: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
})

export const Component: React.VFC<Props> = memo((props) => {
  const { attachmentId, onOpenFileViewer, onDelete, ...rest } = props
  const { attachment } = useAttachment(attachmentId)

  const handleClick = useCallback(() => {
    onOpenFileViewer(attachmentId)
  }, [attachmentId, onOpenFileViewer])

  switch (attachment.fileType.typeCode) {
    case FileTypeCode.Image: {
      return (
        <Image onClick={handleClick} attachmentId={attachmentId} {...rest} />
      )
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      return (
        <File onClick={handleClick} attachmentId={attachmentId} {...rest} />
      )
    }
  }
})
Component.displayName = 'Component'
ThumbnailAttachment.displayName = 'ThumbnailAttachment'
