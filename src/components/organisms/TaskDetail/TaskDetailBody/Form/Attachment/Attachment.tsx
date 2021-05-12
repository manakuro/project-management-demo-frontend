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
  const { onOpen, setTask } = useFileViewerModal()

  const handleClick = useCallback(() => {
    setTask({ taskId: props.taskId })
    onOpen()
  }, [onOpen, props.taskId, setTask])

  return (
    <Wrap spacing={3}>
      {attachmentIds.map((id) => (
        <WrapItem key={id} onClick={handleClick}>
          <ThumbnailAttachment attachmentId={id} />
        </WrapItem>
      ))}
      <NewButton />
    </Wrap>
  )
})
