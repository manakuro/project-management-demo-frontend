import React, { memo, useCallback } from 'react'
import { useFileViewerModal } from 'src/components/features/organisms/Modals'
import { useInputContext } from 'src/components/features/organisms/TaskDetail/TaskDetailFooter/Comment/Input/Provider'
import { Wrap, WrapItem } from 'src/components/ui/atoms'
import {
  ThumbnailAttachment,
  AttachmentUploadingBox,
} from 'src/components/ui/molecules'

type Props = {}

export const Attachments: React.FC<Props> = memo<Props>(() => {
  const { taskFileIds, uploadingFiles, onDeleteTaskFile } = useInputContext()
  const { onOpen, setState } = useFileViewerModal()

  const onOpenFileViewer = useCallback(
    (taskFileId: string) => {
      setState({
        taskFileIds,
        currentTaskFileId: taskFileId,
      })
      onOpen()
    },
    [taskFileIds, onOpen, setState],
  )

  if (!taskFileIds.length && !uploadingFiles.length) return null

  return (
    <Wrap spacing={3} py={2}>
      {taskFileIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            taskFileId={id}
            onOpenFileViewer={onOpenFileViewer}
            onDelete={onDeleteTaskFile}
          />
        </WrapItem>
      ))}
      {uploadingFiles.map((f, i) => (
        <WrapItem key={`${f.name}-${i}`}>
          <AttachmentUploadingBox file={f} size="md" />
        </WrapItem>
      ))}
    </Wrap>
  )
})
Attachments.displayName = 'Attachments'
