import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const state = atom({
  key: 'taskListDetailState',
  default: false,
})

export const useTasksListDetail = () => {
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
