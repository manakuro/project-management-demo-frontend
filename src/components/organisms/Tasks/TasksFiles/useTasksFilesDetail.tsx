import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useTaskDetail, useTaskDetailModal } from 'src/components/organisms'
import { useRouter } from 'src/router'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
  backToPage: () => void
}

export const useTasksFilesDetail = (props: Props) => {
  const { router } = useRouter()
  const { taskId, refetch, setId, setLoading } = useTaskDetail()
  const { onOpen } = useTaskDetailModal()

  useEffect(() => {
    if (!props.isTaskDetailURL(router)) return
    const newId = props.getTaskDetailId(router)
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
  }, [router, onOpen, refetch, setId, taskId, setLoading, props])

  return {
    backToPage: props.backToPage,
  }
}
