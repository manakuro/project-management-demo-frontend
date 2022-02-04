import React, { memo, useCallback } from 'react'
import { FlexProps } from 'src/components/atoms'
import { FileTypeCode } from 'src/store/entities/fileTypes'
import { TaskFile, useTaskFile } from 'src/store/entities/taskFile'
import { File } from './File'
import { Image } from './Image'
import { Provider } from './Provider'

type Props = FlexProps & {
  taskFileId: string
  onOpenFileViewer: (taskFileId: string) => void
  onDelete: (taskFile: TaskFile) => void
}

export const ThumbnailAttachment: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
})

export const Component: React.VFC<Props> = memo((props) => {
  const { taskFileId, onOpenFileViewer, onDelete, ...rest } = props
  const { taskFile } = useTaskFile(taskFileId)

  const handleClick = useCallback(() => {
    onOpenFileViewer(taskFileId)
  }, [taskFileId, onOpenFileViewer])

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return <Image onClick={handleClick} taskFileId={taskFileId} {...rest} />
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      return <File onClick={handleClick} taskFileId={taskFileId} {...rest} />
    }
  }
})
Component.displayName = 'Component'
ThumbnailAttachment.displayName = 'ThumbnailAttachment'
