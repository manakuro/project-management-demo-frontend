import { useCallback, useEffect } from 'react'
import { useTaskDetail, useTaskDetailDrawer } from 'src/components/organisms'
import { useTasksBoardListItemElement } from 'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'

export const useTasksBoardDetail = () => {
  const { router, navigateToMyTasksBoard } = useRouter()
  const { taskId, refetch, setId, setLoading } = useTaskDetail()
  const { getTasksBoardListItemElements } = useTasksBoardListItemElement()
  const skipElement = useCallback(
    (e: Event): boolean => {
      return getTasksBoardListItemElements().some((ele) =>
        ele.contains(e.target as Node),
      )
    },
    [getTasksBoardListItemElements],
  )
  const { onOpen } = useTaskDetailDrawer()

  useEffect(() => {
    if (!isTaskDetailURL(router)) return

    console.log('render!')
    const newId = getTaskDetailId(router)
    if (taskId === newId) return

    setLoading(true)
    setId(newId)
    onOpen(() => {
      setTimeout(async () => {
        await refetch()
        setLoading(false)
      }, 200)
    })
  }, [router, onOpen, refetch, setId, taskId, setLoading])

  return {
    skipElement,
    backToPage: navigateToMyTasksBoard,
  }
}
