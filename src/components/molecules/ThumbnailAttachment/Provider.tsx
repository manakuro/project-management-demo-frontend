import React, { useCallback, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { createProvider } from 'src/shared/react/createProvider'
import { Attachment, useAttachment } from 'src/store/entities/attachments'

type Props = {
  attachmentId: string
  onDelete: (attachment: Attachment) => void
}

const useValue = (props: Props) => {
  const { ref, isHovering } = useHover()
  const [thumbnailMenuOpened, setThumbnailMenuOpened] = useState<boolean>(false)
  const { attachment } = useAttachment(props.attachmentId)

  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      props.onDelete(attachment)
    },
    [attachment, props],
  )

  return {
    ref,
    isHovering,
    thumbnailMenuOpened,
    setThumbnailMenuOpened,
    onDelete,
  }
}

export const { Provider, useContext: useThumbnailAttachmentContext } =
  createProvider(useValue)
