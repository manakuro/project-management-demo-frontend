import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Menus/AssigneeMenu/useAssigneeMenu/${str}`

const assigneeOpenState = atom<boolean>({
  key: key('popoverAssigneeOpenState'),
  default: false,
})

const assigneeState = atom<any | null>({
  key: key('popoverAssigneeState'),
  default: null,
})

const assigneeSelectedIndexState = atom<number>({
  key: key('popoverAssigneeSelectedIndexState'),
  default: 0,
})

export const useAssigneeMenu = () => {
  const [isOpen, setIsOpen] = useRecoilState(assigneeOpenState)
  const [assignee, setAssignee] = useRecoilState(assigneeState)
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    assigneeSelectedIndexState,
  )

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
    setAssignee,
    assignee,
    selectedIndex,
    setSelectedIndex,
  }
}
