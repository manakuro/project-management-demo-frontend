import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useCallback } from 'react'

const openState = atom({
  key: 'fileViewerOpenState',
  default: false,
})

type TaskState = {
  taskId: string
}
const taskState = atom<TaskState>({
  key: 'fileViewerTaskState',
  default: {
    taskId: '',
  },
})

export const useFileViewerModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [task, setTask] = useRecoilState(taskState)
  const resetTaskState = useResetRecoilState(taskState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetTaskState()
  }, [resetTaskState, setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    task,
    setTask,
  }
}
