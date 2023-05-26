import { useCallback, useState } from 'react'
import { BaseEmoji } from 'src/shared/emoji'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  isOpen: boolean
  emoji: BaseEmoji | null
  onClose: (data?: BaseEmoji) => void
  onOpen: () => Promise<BaseEmoji>
}

type Props = {
  onChange?: (emoji?: BaseEmoji) => void
}
const useValue = (props: Props): ContextProps => {
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
useValue.__PROVIDER__ =
  'src/components/organisms/Popovers/PopoverEmoji/Provider.tsx'
export const { Provider, useContext: usePopoverEmojiContext } =
  createProvider(useValue)
