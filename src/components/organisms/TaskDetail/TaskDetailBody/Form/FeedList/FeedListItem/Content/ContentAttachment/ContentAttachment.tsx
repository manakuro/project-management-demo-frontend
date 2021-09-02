import React, { memo, useCallback } from 'react'
import { useFileViewerModal } from 'src/components/organisms/Modals'
import {
  useAttachment,
  useAttachmentIdsByTaskId,
} from 'src/store/entities/attachments'
import { ATTACHMENT_TYPE_IMAGE } from 'src/store/entities/attachments/types'
import { useFeedListItemContext } from '../../Provider'
import { File } from './File'
import { Image } from './Image'

type Props = {
  attachmentId: string
}

export const ContentAttachment: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = useFeedListItemContext()
  const { attachment } = useAttachment(props.attachmentId)
  const { attachmentIds } = useAttachmentIdsByTaskId(taskId)
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
