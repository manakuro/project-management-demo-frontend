import { useCallback, useEffect } from 'react'
import { TaskResponse, useTasks } from 'src/store/tasks'
import { dateFns } from 'src/shared/dateFns'

type Props = {
  lazy?: boolean
}

export const useMyTasksQuery = (props?: Props) => {
  const { setTasks } = useTasks()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchTasks()
      setTasks(res)
    })()
  }, [props?.lazy, setTasks])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchTasks()
      setTasks(res)
    })()
  }, [setTasks])

  return {
    refetch,
  }
}

const fetchTasks = async (): Promise<TaskResponse[]> => {
  return new Promise<TaskResponse[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          projectId: '1',
          name: 'Resolve an issue of auto focus for tasks list detail page',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          isDone: true,
          subTasks: [
            {
              id: '1',
              taskId: '1',
              projectId: '1',
              name: 'Subtask 1',
              dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
              dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
              isDone: false,
              assigneeId: '1',
            },
            {
              id: '2',
              taskId: '1',
              projectId: '1',
              name: 'Subtask 2',
              dueDate: '',
              dueTime: '',
              isDone: true,
              assigneeId: '',
            },
          ],
          assigneeId: '1',
          attachments: [
            {
              id: '1',
              taskId: '1',
              name: '/images/cat_img.png',
              src: '/images/cat_img.png',
              type: 1,
            },
            {
              id: '2',
              taskId: '1',
              name: '/images/screen_shot.png',
              src: '/images/screen_shot.png',
              type: 1,
            },
            {
              id: '3',
              taskId: '1',
              name: '/files/pdf-test.pdf',
              src: '/files/pdf-test.pdf',
              type: 2,
            },
          ],
        },
        {
          id: '2',
          projectId: '1',
          name: 'Implement Task Due Soon',
          dueDate: new Date(dateFns.addDays(new Date(), 4)).toISOString(),
          isDone: true,
          subTasks: [],
          assigneeId: '',
          attachments: [],
        },
        {
          id: '3',
          projectId: '2',
          name: 'Implement Recent Projects',
          dueDate: new Date(dateFns.addDays(new Date(), 5)).toISOString(),
          isDone: false,
          subTasks: [],
          assigneeId: '',
          attachments: [],
        },
        {
          id: '4',
          projectId: '1',
          name: 'Implement Date picker',
          dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
          isDone: false,
          subTasks: [],
          assigneeId: '',
          attachments: [],
        },
        {
          id: '5',
          projectId: '1',
          name: 'Implement Message page',
          dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
          isDone: false,
          subTasks: [],
          assigneeId: '',
          attachments: [],
        },
      ])
    }, 1000)
  })
}
