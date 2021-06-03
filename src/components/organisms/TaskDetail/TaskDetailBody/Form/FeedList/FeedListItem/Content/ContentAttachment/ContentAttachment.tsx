import React, { memo, useCallback } from 'react'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import {
  useAttachment,
  useAttachmentsByTask,
} from 'src/store/entities/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/entities/attachments/types'
import { Image } from './Image'
import { File } from './File'
import { useFileViewerModal } from 'src/components/organisms'

type Props = {
  attachmentId: string
}

export const ContentAttachment: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = useFeedListItem()
  const { attachment } = useAttachment(props.attachmentId)
  const { attachmentIds } = useAttachmentsByTask(taskId)
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
