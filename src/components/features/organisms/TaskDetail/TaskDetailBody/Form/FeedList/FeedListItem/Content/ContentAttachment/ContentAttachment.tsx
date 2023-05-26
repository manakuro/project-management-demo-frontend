import React, { memo, useCallback } from 'react'
import { useFileViewerModal } from 'src/components/features/organisms/Modals'
import { FileTypeCode } from 'src/graphql/enums'
import {
  useTaskFile,
  useTaskFileIdsByTaskId,
} from 'src/store/entities/taskFile'
import { useTaskFeedListItemContext } from '../../Provider'
import { File } from './File'
import { Image } from './Image'

type Props = {
  taskFileId: string
}

export const ContentAttachment: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = useTaskFeedListItemContext()
  const { taskFile } = useTaskFile(props.taskFileId)
  const { taskFileIds } = useTaskFileIdsByTaskId(taskId)
  const { onOpen, setState } = useFileViewerModal()

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskFileIds,
      currentTaskFileId: taskFile.id,
    })
    onOpen()
  }, [taskFile.id, taskFileIds, onOpen, setState])

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image:
      return (
        <Image taskFileId={props.taskFileId} onClick={handleOpenFileViewer} />
      )
    default:
      return (
        <File taskFileId={props.taskFileId} onClick={handleOpenFileViewer} />
      )
  }
})
ContentAttachment.displayName = 'ContentAttachment'
