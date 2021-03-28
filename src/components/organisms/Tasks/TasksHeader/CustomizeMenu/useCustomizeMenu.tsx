import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const state = atom({
  key: 'customizeMenuState',
  default: false,
})

export const useCustomizeMenu = () => {
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
