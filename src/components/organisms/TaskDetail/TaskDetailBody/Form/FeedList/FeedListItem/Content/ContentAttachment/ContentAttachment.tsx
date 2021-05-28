import React, { memo, useCallback } from 'react'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useAttachment } from 'src/store/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/attachments/types'
import { Image } from './Image'
import { File } from './File'
import { useFileViewerModal } from 'src/components/organisms'

type Props = {
  attachmentId: string
}

export const ContentAttachment: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = useFeedListItem()
  const { attachment } = useAttachment(props.attachmentId)
  const { onOpen, setState } = useFileViewerModal()

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskId: taskId,
      currentAttachmentId: attachment.id,
    })
    onOpen()
  }, [attachment.id, onOpen, setState, taskId])

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
