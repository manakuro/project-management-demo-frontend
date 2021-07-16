import { BaseEmoji } from 'emoji-mart'
import { useCallback, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type Props = {
  onChange?: (emoji?: BaseEmoji) => void
}
const useValue = (props: Props) => {
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

  return {
    isOpen,
    emoji,
    onClose,
    onOpen,
  }
}

export const { Provider, useContext: usePopoverEmojiContext } =
  createProvider(useValue)
