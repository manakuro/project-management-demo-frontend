import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'

const key = (str: string) =>
  `src/components/organisms/TaskDetails/TaskDetailSide/useTaskDetailSide/${str}`

const openState = atom<boolean>({
  key: key('openState'),
  default: false,
})

export const useTaskDetailSide = () => {
  const { resetScrollId, resetId, taskId } = useTaskDetail()
  const [isOpen, setIsOpen] = useRecoilState(openState)

  const onClose = useCallback(async () => {
    setIsOpen(false)
    resetId()
    resetScrollId()
  }, [setIsOpen, resetId, resetScrollId])

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
    taskId,
  }
}
