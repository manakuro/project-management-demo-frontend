import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksHeader/CustomizeMenu/useCustomizeMenu/${str}`

const state = atom({
  key: key('customizeMenuState'),
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
