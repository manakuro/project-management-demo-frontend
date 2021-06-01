import React, { memo, useCallback } from 'react'
import { Wrap, WrapItem } from 'src/components/atoms'
import { useInput } from 'src/components/organisms/TaskDetail/TaskDetailFooter/Comment/Input/Provider'
import {
  ThumbnailAttachment,
  AttachmentUploadingBox,
} from 'src/components/molecules'
import { useFileViewerModal } from 'src/components/organisms'

type Props = {}

export const Attachments: React.FC<Props> = memo<Props>(() => {
  const { attachmentIds, uploadingFiles } = useInput()
  const { onOpen, setState } = useFileViewerModal()

  const onOpenFileViewer = useCallback(
    (attachmentId: string) => {
      setState({
        attachmentIds,
        currentAttachmentId: attachmentId,
      })
      onOpen()
    },
    [attachmentIds, onOpen, setState],
  )

  if (!attachmentIds.length && !uploadingFiles.length) return null

  return (
    <Wrap spacing={3} py={2}>
      {attachmentIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            attachmentId={id}
            onOpenFileViewer={onOpenFileViewer}
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
