import React, { createContext, useContext, useState } from 'react'
import { useHover } from 'src/hooks/useHover'

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>
  isHovering: boolean
  thumbnailMenuOpened: boolean
  setThumbnailMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<ContextProps>({
  ref: null as any,
  isHovering: false,
  thumbnailMenuOpened: false,
  setThumbnailMenuOpened: () => {},
})
export const useThumbnailAttachment = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const { ref, isHovering } = useHover()
  const [thumbnailMenuOpened, setThumbnailMenuOpened] = useState<boolean>(false)

  return (
    <Context.Provider
      value={{
        ref,
        isHovering,
        thumbnailMenuOpened,
        setThumbnailMenuOpened,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
