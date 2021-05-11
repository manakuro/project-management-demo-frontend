import React, { memo } from 'react'
import { NewButton } from './NewButton'
import { Stack } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'
import { useAttachmentsByTask } from 'src/store/attachments'

type Props = {
  taskId: string
}

export const Attachment: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentsByTask(props.taskId)

  return (
    <Stack alignItems="center" direction="row" spacing={4}>
      {attachmentIds.map((id) => (
        <ThumbnailAttachment key={id} attachmentId={id} />
      ))}
      <NewButton />
    </Stack>
  )
})
