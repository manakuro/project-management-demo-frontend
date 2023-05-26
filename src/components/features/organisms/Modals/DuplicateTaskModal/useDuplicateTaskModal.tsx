import { useCallback } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Modals/DuplicateTaskModal/useDuplicateTaskModal/${str}`

const state = atom({
  key: key('modalState'),
  default: false,
})

const taskIdState = atom<string>({
  key: key('taskIdState'),
  default: '',
})

export const useDuplicateTaskModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(state)
  const [taskId, setTaskId] = useRecoilState(taskIdState)
  const resetTaskId = useResetRecoilState(taskIdState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetTaskId()
  }, [resetTaskId, setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    taskId,
    setTaskId,
  }
}
