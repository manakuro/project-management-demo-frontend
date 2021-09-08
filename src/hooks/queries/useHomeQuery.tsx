import { useCallback, useEffect, useState } from 'react'
import { dateFns } from 'src/shared/dateFns'
import { useHomeResponse, HomeResponse } from 'src/store/app/home'

type Props = {
  lazy?: boolean
}

export const useHomeQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setHome } = useHomeResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetchTasks()
      setHome(res)
      setLoading(false)
    })()
  }, [props?.lazy, setHome, setLoading])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetchTasks()
      setHome(res)
      setLoading(false)
    })()
  }, [setHome, setLoading])

  return {
    refetch,
    loading,
  }
}

const fetchTasks = async (): Promise<HomeResponse> => {
  return new Promise<HomeResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        tasksDueSoon: [
          {
            id: '1',
            taskSectionId: '1',
            projects: [
              {
                id: '1',
                taskId: '1',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
              {
                id: '2',
                taskId: '1',
                projectId: '2',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: 'Resolve an issue of auto focus for tasks list detail page',
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            isDone: true,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
            createdBy: '1',
          },
          {
            id: '2',
            taskSectionId: '1',
            projects: [
              {
                id: '3',
                taskId: '2',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: 'Implement Task Due Soon',
            dueDate: new Date(dateFns.addDays(new Date(), 4)).toISOString(),
            dueTime: '',
            isDone: true,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: new Date(dateFns.subDays(new Date(), 3)).toISOString(),
            createdBy: '1',
          },
          {
            id: '3',
            taskSectionId: '1',
            projects: [
              {
                id: '4',
                taskId: '3',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: 'Implement Recent Projects',
            dueDate: new Date(dateFns.addDays(new Date(), 5)).toISOString(),
            isDone: false,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: '',
            createdBy: '1',
          },
          {
            id: '4',
            taskSectionId: '1',
            projects: [
              {
                id: '5',
                taskId: '4',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: 'Implement Date picker',
            dueDate: new Date(dateFns.addDays(new Date(), 5)).toISOString(),
            isDone: false,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: '',
            createdBy: '1',
          },
          {
            id: '5',
            taskSectionId: '1',
            projects: [
              {
                id: '6',
                taskId: '5',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: 'Implement Message page',
            dueDate: new Date(dateFns.addDays(new Date(), 5)).toISOString(),
            isDone: false,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: '',
            createdBy: '1',
          },
          {
            id: '10',
            taskSectionId: '2',
            projects: [
              {
                id: '7',
                taskId: '10',
                projectId: '1',
                createdAt: '',
                updatedAt: '',
              },
            ],
            name: '一覧ページの実装',
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            isDone: true,
            subTasks: [],
            assigneeId: '1',
            attachments: [],
            feeds: [],
            teammates: [],
            tags: [],
            isNew: false,
            isDeleted: false,
            taskParentId: '',
            doneAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
            createdBy: '1',
          },
        ],
      })
    }, 500)
  })
}
