import React, { memo, useCallback } from 'react'
import { useFileViewerModal } from 'src/components/organisms'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useAttachment } from 'src/store/entities/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/entities/attachments/types'
import { useTasksAttachmentIds } from 'src/store/entities/tasks/attachmentIds'
import { File } from './File'
import { Image } from './Image'

type Props = {
  attachmentId: string
}

export const ContentAttachment: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = useFeedListItemContext()
  const { attachment } = useAttachment(props.attachmentId)
  const { attachmentIds } = useTasksAttachmentIds(taskId)
  const { onOpen, setState } = useFileViewerModal()

  const handleOpenFileViewer = useCallback(() => {
    setState({
      attachmentIds,
      currentAttachmentId: attachment.id,
    })
    onOpen()
  }, [attachment.id, attachmentIds, onOpen, setState])

  switch (attachment.type) {
    case ATTACHMENT_TYPE_IMAGE:
      return (
        <Image
          attachmentId={props.attachmentId}
          onClick={handleOpenFileViewer}
        />
      )
    default:
      return (
        <File
          attachmentId={props.attachmentId}
          onClick={handleOpenFileViewer}
        />
      )
  }
})
ContentAttachment.displayName = 'ContentAttachment'
