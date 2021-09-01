import { NextRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import { useTasksListBody } from 'src/components/organisms/Tasks'
import { useRouter } from 'src/router'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
}

export const useTasksListDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId } = props
  const { router } = useRouter()
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

    const newId = getTaskDetailId(router)
    if (taskId === newId) return
    console.log('useTasksListDetail!: ', newId)

    setLoading(true)
    setId(newId)
    onOpen(() => {
      setTimeout(async () => {
        await refetch()
        setLoading(false)
      }, 200)
    })
  }, [
    router,
    onOpen,
    refetch,
    setId,
    taskId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
  ])

  return {
    skipElement,
  }
}
