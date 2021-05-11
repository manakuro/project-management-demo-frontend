import React, { memo } from 'react'
import { NewButton } from './NewButton'
import { Wrap, WrapItem } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'
import { useAttachmentsByTask } from 'src/store/attachments'

type Props = {
  taskId: string
}

export const Attachment: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentsByTask(props.taskId)

  return (
    <Wrap spacing={3}>
      {attachmentIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment attachmentId={id} />
        </WrapItem>
      ))}
      <NewButton />
    </Wrap>
  )
})
