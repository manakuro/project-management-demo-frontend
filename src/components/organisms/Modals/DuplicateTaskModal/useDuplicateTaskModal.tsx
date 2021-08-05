import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Modals/DuplicateTaskModal/useDuplicateTaskModal/${str}`

const state = atom({
  key: key('modalState'),
  default: false,
})

export const useDuplicateTaskModal = () => {
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
