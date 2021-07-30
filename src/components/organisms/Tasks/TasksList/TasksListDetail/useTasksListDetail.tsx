import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTaskDetailQuery } from 'src/hooks/queries/useTaskDetailQuery'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'
import { useMyTasksTabStatus } from 'src/store/app/myTasks/taskTabStatus'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksList/TasksListDetail/useTasksListDetail/${str}`

const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: false,
})

const openState = atom<boolean>({
  key: key('openState'),
  default: false,
})

const idState = atom<string>({
  key: key('idState'),
  default: '',
})

const scrollIdState = atom<string>({
  key: key('scrollIdState'),
  default: '',
})

type Props = {
  listenRouter?: boolean
}
export const useTasksListDetail = (props?: Props) => {
  const {
    router,
    navigateToMyTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
  } = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [id, setId] = useRecoilState(idState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [scrollId, setScrollId] = useRecoilState(scrollIdState)
  const resetScrollId = useResetRecoilState(scrollIdState)
  const resetId = useResetRecoilState(idState)
  const { refetch } = useTaskDetailQuery({ lazy: true })
  const { isTaskTabStatus } = useMyTasksTabStatus()

  const backToPage = useCallback(async () => {
    switch (true) {
      case isTaskTabStatus('list'):
        await navigateToMyTasks()
        break
      case isTaskTabStatus('board'):
        await navigateToMyTasksBoard()
        break
      case isTaskTabStatus('calendar'):
        await navigateToMyTasksCalendar()
    }
  }, [
    isTaskTabStatus,
    navigateToMyTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
  ])

  const onClose = useCallback(async () => {
    setIsOpen(false)
    await backToPage()
    resetId()
    resetScrollId()
  }, [setIsOpen, backToPage, resetId, resetScrollId])

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
