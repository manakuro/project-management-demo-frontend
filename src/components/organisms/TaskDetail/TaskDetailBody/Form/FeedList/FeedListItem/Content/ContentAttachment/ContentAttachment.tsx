import React, { memo, useCallback } from 'react'
import { useFileViewerModal } from 'src/components/organisms/Modals'
import { FileTypeCode } from 'src/graphql/enums'
import {
  useAttachment,
  useAttachmentIdsByTaskId,
} from 'src/store/entities/attachments'
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

  switch (attachment.fileType.typeCode) {
    case FileTypeCode.Image:
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
