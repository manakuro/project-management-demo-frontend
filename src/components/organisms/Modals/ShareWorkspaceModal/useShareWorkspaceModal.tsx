import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const state = atom({
  key: 'shareWorkspaceModalState',
  default: false,
})

export const useShareWorkspaceModal = () => {
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
