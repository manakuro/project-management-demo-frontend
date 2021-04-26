import { useCallback, useEffect } from 'react'
import { Task, useTasks } from 'src/store/tasks'
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

const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          projectId: '1',
          name: 'Resolve an issue of auto focus for tasks list detail page',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          isDone: true,
        },
        {
          id: '2',
          projectId: '1',
          name: 'Implement Task Due Soon',
          dueDate: new Date(dateFns.addDays(new Date(), 4)).toISOString(),
          isDone: true,
        },
        {
          id: '3',
          projectId: '2',
          name: 'Implement Recent Projects',
          dueDate: new Date(dateFns.addDays(new Date(), 5)).toISOString(),
          isDone: false,
        },
        {
          id: '4',
          projectId: '1',
          name: 'Implement Date picker',
          dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
          isDone: false,
        },
        {
          id: '5',
          projectId: '1',
          name: 'Implement Message page',
          dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
          isDone: false,
        },
      ])
    }, 1000)
  })
}
