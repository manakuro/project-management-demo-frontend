import React, { memo, useCallback } from 'react'
import { NewButton } from './NewButton'
import { Wrap, WrapItem } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'
import { useAttachmentsByTask } from 'src/store/attachments'
import { useFileViewerModal } from 'src/components/organisms'

type Props = {
  taskId: string
}

export const Attachment: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentsByTask(props.taskId)
  const { onOpen, setState } = useFileViewerModal()

  const onOpenFileViewer = useCallback(
    (attachmentId: string) => {
      setState({
        taskId: props.taskId,
        currentAttachmentId: attachmentId,
      })
      onOpen()
    },
    [onOpen, props.taskId, setState],
  )

  return (
    <Wrap spacing={3}>
      {attachmentIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            attachmentId={id}
            onOpenFileViewer={onOpenFileViewer}
          />
        </WrapItem>
      ))}
      <NewButton />
    </Wrap>
  )
})
