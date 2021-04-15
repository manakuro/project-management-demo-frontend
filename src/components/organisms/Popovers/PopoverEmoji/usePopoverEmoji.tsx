import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { EmojiData } from 'emoji-mart'

const emojiOpenState = atom<boolean>({
  key: 'popoverEmojiOpenState',
  default: false,
})

const emojiState = atom<EmojiData | null>({
  key: 'popoverEmojiState',
  default: null,
})

const emojiCallbackState = atom<(val: EmojiData | null) => void>({
  key: 'popoverEmojiCallbackState',
  default: () => {},
})

export const usePopoverEmoji = () => {
  const [isOpen, setIsOpen] = useRecoilState(emojiOpenState)
  const [emoji, setEmoji] = useRecoilState(emojiState)
  const [callback, setCallback] = useRecoilState(emojiCallbackState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    callback(emoji)
  }, [callback, emoji, setIsOpen])

  const onOpen = useCallback(() => {
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
