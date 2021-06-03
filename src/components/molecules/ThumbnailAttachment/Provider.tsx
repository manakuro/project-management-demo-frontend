import React, { createContext, useCallback, useContext, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { Attachment, useAttachment } from 'src/store/entities/attachments'

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>
  isHovering: boolean
  thumbnailMenuOpened: boolean
  setThumbnailMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (e: React.MouseEvent<HTMLElement>) => void
}

const Context = createContext<ContextProps>({
  ref: null as any,
  isHovering: false,
  thumbnailMenuOpened: false,
  setThumbnailMenuOpened: () => {},
  onDelete: () => void {},
})
export const useThumbnailAttachment = () => useContext(Context)

type Props = {
  attachmentId: string
  onDelete: (attachment: Attachment) => void
}
export const Provider: React.FC<Props> = (props) => {
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

  return (
    <Context.Provider
      value={{
        ref,
        isHovering,
        thumbnailMenuOpened,
        setThumbnailMenuOpened,
        onDelete,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
