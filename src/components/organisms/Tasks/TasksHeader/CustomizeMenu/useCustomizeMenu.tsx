import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

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
