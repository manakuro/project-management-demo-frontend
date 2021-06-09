import React, { memo, useCallback } from 'react'
import { Wrap, WrapItem } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'
import { useFileViewerModal } from 'src/components/organisms'
import { useToast } from 'src/hooks'
import { useAttachmentsByTask } from 'src/store/entities/attachments'
import { Attachment as TAttachment } from 'src/store/entities/attachments'
import { NewButton } from './NewButton'

type Props = {
  taskId: string
}

export const Attachment: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentsByTask(props.taskId)
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
        title: 'Deleted successfully',
        description: `${attachment.name} is deleted from this task`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
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
