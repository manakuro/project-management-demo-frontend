import { useCallback, useEffect } from 'react'
import { useMyTasks } from 'src/store/app/myTasks'
import { dateFns } from 'src/shared/dateFns'
import { MyTaskResponse } from 'src/store/app/myTasks'
import { atom, useRecoilState } from 'recoil'

type Props = {
  lazy?: boolean
}

const myTasksQueryState = atom<{ loading: boolean }>({
  key: 'myTasksQueryState',
  default: {
    loading: false,
  },
})

export const useMyTasksQuery = (props?: Props) => {
  const [state, setState] = useRecoilState(myTasksQueryState)
  const { setMyTasks } = useMyTasks()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setState((s) => ({ ...s, loading: true }))
      const res = await fetchTasks()
      setMyTasks(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [props?.lazy, setMyTasks, setState])

  const refetch = useCallback(() => {
    ;(async () => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetchTasks()
      setMyTasks(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [setMyTasks, setState])

  return {
    refetch,
    ...state,
  }
}

const fetchTasks = async (): Promise<MyTaskResponse[]> => {
  return new Promise<MyTaskResponse[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Recently assigned',
          teammateId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [
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
                  dueDate: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
                  dueTime: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
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
                  createdAt: new Date().toISOString(),
                  type: 1,
                  status: 1,
                },
                {
                  id: '2',
                  taskId: '1',
                  name: '/images/screen_shot.png',
                  src: '/images/screen_shot.png',
                  createdAt: new Date().toISOString(),
                  type: 1,
                  status: 1,
                },
                {
                  id: '3',
                  taskId: '1',
                  name: '/files/pdf-test.pdf',
                  src: '/files/pdf-test.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '4',
                  taskId: '1',
                  name: '/files/pdf-test-2.pdf',
                  src: '/files/pdf-test-2.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '5',
                  taskId: '1',
                  name: 'コンピュータシステムの理論と実践',
                  src: '/files/コンピュータシステムの理論と実践.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '6',
                  taskId: '1',
                  name: '/files/test.js',
                  src: '/files/test.js',
                  createdAt: new Date().toISOString(),
                  type: 3,
                  status: 1,
                },
              ],
              feeds: [
                {
                  id: '1',
                  taskId: '1',
                  teammateId: '1',
                  description: JSON.stringify(
                    {
                      type: 'doc',
                      content: [],
                    },
                    null,
                    2,
                  ),
                  attachmentIds: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  isFirst: true,
                  isPinned: false,
                },
                {
                  id: '2',
                  taskId: '1',
                  teammateId: '1',
                  description: JSON.stringify(
                    {
                      type: 'doc',
                      content: [],
                    },
                    null,
                    2,
                  ),
                  attachmentIds: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  isFirst: false,
                  isPinned: false,
                },
              ],
              teammates: [
                {
                  id: '1',
                  name: 'Manato Kuroda',
                  image: '/images/cat_img.png',
                  email: 'manato.kuroda@gmail.com',
                },
                {
                  id: '2',
                  name: 'Dan Abrahmov',
                  image: 'https://bit.ly/dan-abramov',
                  email: 'dan.abrahmov@gmail.com',
                },
              ],
            },
            {
              id: '2',
              projectId: '1',
              name: 'Implement Task Due Soon',
              dueDate: '',
              dueTime: '',
              isDone: true,
              subTasks: [],
              assigneeId: '',
              attachments: [],
              feeds: [],
              teammates: [
                {
                  id: '1',
                  name: 'Manato Kuroda',
                  image: '/images/cat_img.png',
                  email: 'manato.kuroda@gmail.com',
                },
                {
                  id: '2',
                  name: 'Dan Abrahmov',
                  image: 'https://bit.ly/dan-abramov',
                  email: 'dan.abrahmov@gmail.com',
                },
                {
                  id: '3',
                  name: 'Kent Dodds',
                  image: 'https://bit.ly/kent-c-dodds',
                  email: 'kent.dodds@gmail.com',
                },
              ],
            },
            {
              id: '3',
              projectId: '2',
              name: 'Implement Recent Projects',
              dueDate: new Date('2021/06/01').toISOString(),
              isDone: false,
              subTasks: [],
              assigneeId: '',
              attachments: [],
              feeds: [],
              teammates: [],
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
              feeds: [],
              teammates: [],
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
              feeds: [],
              teammates: [],
            },
          ],
        },
        {
          id: '2',
          name: 'Today',
          teammateId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [
            {
              id: '10',
              projectId: '1',
              name: '一覧ページの実装',
              dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
              dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
              isDone: true,
              subTasks: [
                {
                  id: '10',
                  taskId: '10',
                  projectId: '1',
                  name: 'Subtask 1',
                  dueDate: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
                  dueTime: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
                  isDone: false,
                  assigneeId: '1',
                },
                {
                  id: '2-2',
                  taskId: '10',
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
                  createdAt: new Date().toISOString(),
                  type: 1,
                  status: 1,
                },
                {
                  id: '2',
                  taskId: '1',
                  name: '/images/screen_shot.png',
                  src: '/images/screen_shot.png',
                  createdAt: new Date().toISOString(),
                  type: 1,
                  status: 1,
                },
                {
                  id: '3',
                  taskId: '1',
                  name: '/files/pdf-test.pdf',
                  src: '/files/pdf-test.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '4',
                  taskId: '1',
                  name: '/files/pdf-test-2.pdf',
                  src: '/files/pdf-test-2.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '5',
                  taskId: '1',
                  name: 'コンピュータシステムの理論と実践',
                  src: '/files/コンピュータシステムの理論と実践.pdf',
                  createdAt: new Date().toISOString(),
                  type: 2,
                  status: 1,
                },
                {
                  id: '6',
                  taskId: '1',
                  name: '/files/test.js',
                  src: '/files/test.js',
                  createdAt: new Date().toISOString(),
                  type: 3,
                  status: 1,
                },
              ],
              feeds: [
                {
                  id: '10',
                  taskId: '10',
                  teammateId: '1',
                  description: JSON.stringify(
                    {
                      type: 'doc',
                      content: [],
                    },
                    null,
                    2,
                  ),
                  attachmentIds: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  isFirst: true,
                  isPinned: false,
                },
                {
                  id: '2-2',
                  taskId: '10',
                  teammateId: '1',
                  description: JSON.stringify(
                    {
                      type: 'doc',
                      content: [],
                    },
                    null,
                    2,
                  ),
                  attachmentIds: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  isFirst: false,
                  isPinned: false,
                },
              ],
              teammates: [
                {
                  id: '1',
                  name: 'Manato Kuroda',
                  image: '/images/cat_img.png',
                  email: 'manato.kuroda@gmail.com',
                },
                {
                  id: '2',
                  name: 'Dan Abrahmov',
                  image: 'https://bit.ly/dan-abramov',
                  email: 'dan.abrahmov@gmail.com',
                },
              ],
            },
          ],
        },
      ])
    }, 1000)
  })
}
