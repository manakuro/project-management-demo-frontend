import { NextRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import { useTasksBoardListItemElement } from 'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem'
import { UseClickOutsideOptionsHasClickedOutside } from 'src/hooks'
import { useRouter } from 'src/router'
import { isHTMLElement } from 'src/shared/isHTMLElement'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
}

export const useTasksBoardDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId } = props
  const { router } = useRouter()
  const { taskId, refetch, setId, setLoading } = useTaskDetail()
  const { className } = useTasksBoardListItemElement()
  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e, helpers) => {
        if (helpers.isContainInModalContent(e)) return false
        if (helpers.isContainInMenuList(e)) return false
        if (helpers.isContainInToastContent(e)) return false
        if (helpers.isContainInPopoverContent(e)) return false
        if (!isHTMLElement(e.target)) return false
        if (e.target.closest(`.${className}`)) return false

        return true
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
    hasClickedOutside,
  }
}
