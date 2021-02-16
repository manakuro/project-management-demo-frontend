import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const state = atom({
  key: 'inviteModalState',
  default: false,
})

export const useInviteModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(state)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return {
    isOpen,
    setIsOpen,
    onClose,
  }
}
