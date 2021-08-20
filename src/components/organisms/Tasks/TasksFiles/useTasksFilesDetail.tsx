import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTaskDetailModal } from 'src/components/organisms/TaskDetails'
import { useRouter } from 'src/router'

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean
  getTaskDetailId: (router: NextRouter) => string
  backToPage: () => void
}

export const useTasksFilesDetail = (props: Props) => {
  const { router } = useRouter()
  const { refetch, setId, setLoading } = useTaskDetail()
  const { onOpen } = useTaskDetailModal()
  const { isTaskDetailURL, getTaskDetailId } = props

  useEffect(() => {
    if (!isTaskDetailURL(router)) return
    const newId = getTaskDetailId(router)
    console.log('useTasksFilesDetail!: ', newId)

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
  ])

  return {
    backToPage: props.backToPage,
  }
}
