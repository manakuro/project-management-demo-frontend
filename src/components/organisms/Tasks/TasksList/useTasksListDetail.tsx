import { useCallback, useEffect } from 'react'
import { useTaskDetail, useTaskDetailDrawer } from 'src/components/organisms'
import { useTasksListBody } from 'src/pages/MyTasks/List/useTasksListBody'
import { isTaskDetailURL, useRouter, getTaskDetailId } from 'src/router'

export const useTasksListDetail = () => {
  const { router, navigateToMyTasks } = useRouter()
  const { getTasksListBodyElement } = useTasksListBody()
  const skipElement = useCallback(
    (e: Event): boolean => {
      if (e.target === getTasksListBodyElement()) return false
      if (getTasksListBodyElement()?.contains(e.target as Node) ?? false)
        return true
      return false
    },
    [getTasksListBodyElement],
  )
  const { onOpen } = useTaskDetailDrawer()
  const { taskId, refetch, setId, setLoading } = useTaskDetail()

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
    backToPage: navigateToMyTasks,
  }
}
