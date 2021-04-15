import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { BaseEmoji } from 'emoji-mart'

const emojiOpenState = atom<boolean>({
  key: 'popoverEmojiOpenState',
  default: false,
})

const emojiState = atom<BaseEmoji | null>({
  key: 'popoverEmojiState',
  default: null,
})

const emojiCallbackState = atom<(val: BaseEmoji | null) => void>({
  key: 'popoverEmojiCallbackState',
  default: () => {},
})

export const usePopoverEmoji = () => {
  const [isOpen, setIsOpen] = useRecoilState(emojiOpenState)
  const [emoji, setEmoji] = useRecoilState(emojiState)
  const [callback, setCallback] = useRecoilState(emojiCallbackState)

  const onClose = useCallback(
    (data: BaseEmoji) => {
      setIsOpen(false)
      callback(data)
      setEmoji(data)
    },
    [callback, setIsOpen, setEmoji],
  )

  const onOpen = useCallback((): Promise<BaseEmoji> => {
    return new Promise((resolve) => {
      setIsOpen(true)
      setCallback(() => resolve)
    })
  }, [setIsOpen, setCallback])

  return {
    isOpen,
    onOpen,
    onClose,
    setEmoji,
    emoji,
  }
}
