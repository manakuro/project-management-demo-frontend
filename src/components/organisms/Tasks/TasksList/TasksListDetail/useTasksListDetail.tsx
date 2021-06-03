import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useCallback, useEffect } from 'react'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'
import { useTaskDetailQuery } from 'src/hooks/queries/useTaskDetailQuery'

const taskListDetailOpenState = atom({
  key: 'taskListDetailOpenState',
  default: false,
})

const taskListDetailIdState = atom({
  key: 'taskListDetailIdState',
  default: '',
})

export const useTasksListDetail = () => {
  const { router, navigateToTasks } = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(taskListDetailOpenState)
  const [id, setId] = useRecoilState(taskListDetailIdState)
  const resetId = useResetRecoilState(taskListDetailIdState)
  const { refetch, loading } = useTaskDetailQuery({ lazy: true })

  const onClose = useCallback(async () => {
    setIsOpen(false)
    await navigateToTasks()
    resetId()
  }, [setIsOpen, navigateToTasks, resetId])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  useEffect(() => {
    if (!isTaskDetailURL(router)) return

    setId(getTaskDetailId(router))
    refetch()
    onOpen()
  }, [router, onOpen, setId, refetch])

  return {
    isOpen,
    onOpen,
    onClose,
    loading,
    taskId: id,
  }
}
