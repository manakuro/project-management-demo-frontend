import React, { memo, useCallback } from 'react'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useAttachment } from 'src/store/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/attachments/types'
import { Image } from './Image'
import { useFileViewerModal } from 'src/components/organisms'

type Props = {}

export const ContentAttachment: React.VFC<Props> = memo<Props>(() => {
  const { feed, taskId } = useFeedListItem()
  const { attachment } = useAttachment(feed.attachmentId)
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
      return <Image onClick={handleOpenFileViewer} />
    default:
      return null
  }
})
ContentAttachment.displayName = 'ContentAttachment'
