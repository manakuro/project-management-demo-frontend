import React, { useCallback, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { createProvider } from 'src/shared/react/createProvider'
import { Attachment, useAttachment } from 'src/store/entities/attachments'

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>
  isHovering: boolean
  thumbnailMenuOpened: boolean
  setThumbnailMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (e: React.MouseEvent<HTMLElement>) => void
}

type Props = {
  attachmentId: string
  onDelete: (attachment: Attachment) => void
}

const useValue = (props: Props): ContextProps => {
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
useValue.__PROVIDER__ =
  'src/components/molecules/ThumbnailAttachment/Provider.tsx'
export const { Provider, useContext: useThumbnailAttachmentContext } =
  createProvider(useValue)
