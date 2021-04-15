import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const state = atom({
  key: 'popoverEmojiState',
  default: false,
})

export const usePopoverEmoji = () => {
  const [isOpen, setIsOpen] = useRecoilState(state)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
  }
}
