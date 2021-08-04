import { useCallback, useEffect } from 'react'
import { useTaskDetail, useTaskDetailDrawer } from 'src/components/organisms'
import { useTasksBoardListItemElement } from 'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'
import { isHTMLElement } from 'src/shared/isHTMLElement'

export const useTasksBoardDetail = () => {
  const { router, navigateToMyTasksBoard } = useRouter()
  const { taskId, refetch, setId, setLoading } = useTaskDetail()
  const { className } = useTasksBoardListItemElement()
  const skipElement = useCallback(
    (e: Event): boolean => {
      if (!isHTMLElement(e.target)) return false
      return !!e.target.closest(`.${className}`)
    },
    [className],
  )
  const { onOpen } = useTaskDetailDrawer()

  useEffect(() => {
    if (!isTaskDetailURL(router)) return

    const newId = getTaskDetailId(router)
    if (taskId === newId) return
    console.log('render!')

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
