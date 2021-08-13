import { useCallback, useEffect, useState } from 'react'
import { useMyTasksAttachmentsResponse } from 'src/store/app/myTasksAttachments'
import { MyTaskAttachmentResponse } from 'src/store/app/myTasksAttachments/type'

type Props = {
  lazy?: boolean
}

export const useMyTasksAttachmentsQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setMyTasksAttachments } = useMyTasksAttachmentsResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetchTasks()
      await setMyTasksAttachments(res)
      setLoading(false)
    })()
  }, [props?.lazy, setMyTasksAttachments])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetchTasks()
      await setMyTasksAttachments(res)
      setLoading(false)
    })()
  }, [setMyTasksAttachments])

  return {
    refetch,
    loading,
  }
}

const fetchTasks = async (): Promise<MyTaskAttachmentResponse[]> => {
  return new Promise<MyTaskAttachmentResponse[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: '/images/cat_img.png',
          src: '/images/cat_img.png',
          createdAt: new Date().toISOString(),
          type: 1,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
        {
          id: '2',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: '/images/screen_shot.png',
          src: '/images/screen_shot.png',
          createdAt: new Date().toISOString(),
          type: 1,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
        {
          id: '3',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: '/files/pdf-test.pdf',
          src: '/files/pdf-test.pdf',
          createdAt: new Date().toISOString(),
          type: 2,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
        {
          id: '4',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: '/files/pdf-test-2.pdf',
          src: '/files/pdf-test-2.pdf',
          createdAt: new Date().toISOString(),
          type: 2,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
        {
          id: '5',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: 'コンピュータシステムの理論と実践',
          src: '/files/コンピュータシステムの理論と実践.pdf',
          createdAt: new Date().toISOString(),
          type: 2,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
        {
          id: '6',
          projectId: '1',
          taskId: '1',
          feedId: '1',
          name: '/files/test.js',
          src: '/files/test.js',
          createdAt: new Date().toISOString(),
          type: 3,
          status: 1,
          task: {
            id: '1',
            name: 'Resolve an issue of auto focus for tasks list detail page',
          },
        },
      ])
    }, 500)
  })
}
