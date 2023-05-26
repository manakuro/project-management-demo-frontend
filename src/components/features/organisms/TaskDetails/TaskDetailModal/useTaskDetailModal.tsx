import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'

const key = (str: string) =>
  `src/components/organisms/TaskDetails/TaskDetailModal/useTaskDetailModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})

export const useTaskDetailModal = () => {
  const { resetScrollId, resetId } = useTaskDetail()
  const [isOpen, setIsOpen] = useRecoilState(openState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetId()
    resetScrollId()
  }, [resetId, resetScrollId, setIsOpen])

  const onOpen = useCallback(
    (callback?: () => void) => {
      setIsOpen(true)
      callback?.()
    },
    [setIsOpen],
  )

  return {
    isOpen,
    onOpen,
    onClose,
  }
}
