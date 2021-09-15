import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTaskDetailSide } from 'src/components/organisms/TaskDetails'
import { useRouter } from 'src/router'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
}

export const useInboxTaskDetail = (props: Props) => {
  const { router } = useRouter()
  const { refetch, setId, setLoading, taskId, resetId } = useTaskDetail()
  const { onOpen } = useTaskDetailSide()
  const { isTaskDetailURL, getTaskDetailId } = props

  useEffect(() => {
    return () => {
      resetId()
    }
  }, [resetId])

  useEffect(() => {
    if (!isTaskDetailURL(router)) return
    const newId = getTaskDetailId(router)
    if (taskId === newId) return
    console.log('useInboxTaskDetail!: ', newId)

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
    setLoading,
    setId,
    isTaskDetailURL,
    getTaskDetailId,
    taskId,
  ])
}
