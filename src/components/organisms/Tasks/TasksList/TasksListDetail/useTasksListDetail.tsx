import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTaskDetailQuery } from 'src/hooks/queries/useTaskDetailQuery'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'

const taskListDetailLoadingState = atom<boolean>({
  key: 'taskListDetailLoadingState',
  default: false,
})

const taskListDetailOpenState = atom<boolean>({
  key: 'taskListDetailOpenState',
  default: false,
})

const taskListDetailIdState = atom<string>({
  key: 'taskListDetailIdState',
  default: '',
})

const taskListDetailScrollIdState = atom<string>({
  key: 'taskListDetailScrollIdState',
  default: '',
})

type Props = {
  listenRouter?: boolean
}
export const useTasksListDetail = (props?: Props) => {
  const { router, navigateToTasks } = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(taskListDetailOpenState)
  const [id, setId] = useRecoilState(taskListDetailIdState)
  const [loading, setLoading] = useRecoilState(taskListDetailLoadingState)
  const [scrollId, setScrollId] = useRecoilState(taskListDetailScrollIdState)
  const resetScrollId = useResetRecoilState(taskListDetailScrollIdState)
  const resetId = useResetRecoilState(taskListDetailIdState)
  const { refetch } = useTaskDetailQuery({ lazy: true })

  const onClose = useCallback(async () => {
    setIsOpen(false)
    await navigateToTasks()
    resetId()
    resetScrollId()
  }, [setIsOpen, navigateToTasks, resetId, resetScrollId])

  const onOpen = useCallback(
    (callback?: () => void) => {
      setIsOpen(true)
      callback?.()
    },
    [setIsOpen],
  )

  useEffect(() => {
    if (!props?.listenRouter) return
    if (!isTaskDetailURL(router)) return

    const newId = getTaskDetailId(router)
    if (id === newId) return

    setLoading(true)
    setId(newId)
    onOpen(() => {
      setTimeout(async () => {
        await refetch()
        setLoading(false)
      }, 200)
    })
  }, [router, onOpen, refetch, setId, props?.listenRouter, id, setLoading])

  return {
    isOpen,
    onOpen,
    onClose,
    loading,
    taskId: id,
    refetch,
    scrollId,
    setScrollId,
  }
}
