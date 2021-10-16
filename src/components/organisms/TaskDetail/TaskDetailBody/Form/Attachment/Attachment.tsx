import React, { memo, useCallback } from 'react'
import { Wrap, WrapItem } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'
import { useFileViewerModal } from 'src/components/organisms/Modals'
import { useToast } from 'src/hooks'
import {
  Attachment as TAttachment,
  useAttachmentIdsByTaskId,
} from 'src/store/entities/attachments'
import { NewButton } from './NewButton'

type Props = {
  taskId: string
}

export const Attachment: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentIdsByTaskId(props.taskId)
  const { onOpen, setState } = useFileViewerModal()
  const { toast } = useToast()

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

  const onDelete = useCallback(
    (attachment: TAttachment) => {
      toast({
        description: `${attachment.name} is deleted from this task`,
      })
    },
    [toast],
  )

  return (
    <Wrap spacing={3}>
      {attachmentIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            attachmentId={id}
            onOpenFileViewer={onOpenFileViewer}
            onDelete={onDelete}
          />
        </WrapItem>
      ))}
      <NewButton />
    </Wrap>
  )
})
Attachment.displayName = 'Attachment'
