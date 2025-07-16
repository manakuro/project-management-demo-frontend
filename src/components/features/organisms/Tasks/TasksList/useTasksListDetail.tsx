import type { NextRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'
import { useTaskDetailDrawer } from 'src/components/features/organisms/TaskDetails'
import { useTasksListBody } from 'src/components/features/organisms/Tasks'
import type { UseClickOutsideOptionsHasClickedOutside } from 'src/hooks/useClickOutside'
import { useRouter } from 'src/router'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
  fetchQuery: (variables: { taskId: string }) => Promise<void>
}

export const useTasksListDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props
  const { router } = useRouter()
  const { getTasksListBodyElement } = useTasksListBody()

  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e, helpers): boolean => {
        if (helpers.isContainInModalContent(e)) return false
        if (helpers.isContainInMenuList(e)) return false
        if (helpers.isContainInToastContent(e)) return false
        if (helpers.isContainInPopoverContent(e)) return false
        if (e.target === getTasksListBodyElement()) return false
        if (getTasksListBodyElement()?.contains(e.target as Node) ?? false)
          return false

        return true
      },
      [getTasksListBodyElement],
    )
  const { onOpen } = useTaskDetailDrawer()
  const { taskId, setId, setLoading } = useTaskDetail()

  useEffect(() => {
    if (!isTaskDetailURL(router)) return

    const newId = getTaskDetailId(router)
    if (taskId === newId) return
    console.log('useTasksListDetail!: ', newId)

    setLoading(true)
    setId(newId)
    onOpen(() => {
      setTimeout(async () => {
        await fetchQuery({ taskId: newId })
        setLoading(false)
      }, 200)
    })
  }, [
    router,
    onOpen,
    fetchQuery,
    setId,
    taskId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
  ])

  return {
    hasClickedOutside,
  }
}
