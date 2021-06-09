import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTaskDetailQuery } from 'src/hooks/queries/useTaskDetailQuery'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'

const taskListDetailOpenState = atom({
  key: 'taskListDetailOpenState',
  default: false,
})

const taskListDetailIdState = atom({
  key: 'taskListDetailIdState',
  default: '',
})

type Props = {
  listenRouter?: boolean
}
export const useTasksListDetail = (props?: Props) => {
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
    if (!props?.listenRouter) return
    if (!isTaskDetailURL(router)) return

    setId(getTaskDetailId(router))
    refetch()
    onOpen()
  }, [router, onOpen, setId, refetch, props?.listenRouter])

  return {
    isOpen,
    onOpen,
    onClose,
    loading,
    taskId: id,
  }
}
