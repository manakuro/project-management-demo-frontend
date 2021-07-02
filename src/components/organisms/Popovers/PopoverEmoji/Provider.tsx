import { BaseEmoji } from 'emoji-mart'
import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  isOpen: boolean
  emoji: BaseEmoji | null
  onClose: (data?: BaseEmoji) => void
  onOpen: () => Promise<BaseEmoji>
}

const Context = createContext<ContextProps>({
  isOpen: false,
  emoji: null,
  onClose: () => void {},
  onOpen: (() => {}) as any,
})
export const usePopoverEmojiContext = () => {
  const context = useContext(Context)
  if (!context)
    throw new Error('usePopoverEmoji is only available inside PopoverEmoji')

  return context
}

type Props = {
  onChange?: (emoji?: BaseEmoji) => void
}
export const Provider: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [emoji, setEmoji] = useState<BaseEmoji | null>(null)
  const [callback, setCallback] = useState<(val?: BaseEmoji) => void>()

  const onClose = useCallback(
    (data?: BaseEmoji) => {
      setIsOpen(false)
      callback?.(data)
      props.onChange?.(data)
      setEmoji(data ?? null)
    },
    [callback, props],
  )

  const onOpen = useCallback((): Promise<BaseEmoji> => {
    return new Promise((resolve) => {
      setIsOpen(true)
      setCallback(() => resolve)
    })
  }, [setIsOpen, setCallback])

  return (
    <Context.Provider
      value={{
        isOpen,
        emoji,
        onClose,
        onOpen,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
