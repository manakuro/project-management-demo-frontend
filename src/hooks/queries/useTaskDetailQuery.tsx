import { useCallback, useEffect } from 'react'
import { TaskResponse, useTask } from 'src/store/entities/tasks'
import { dateFns } from 'src/shared/dateFns'
import { atom, useRecoilState } from 'recoil'

type Props = {
  lazy?: boolean
}

const taskDetailQueryState = atom<{ loading: boolean }>({
  key: 'taskDetailQueryState',
  default: {
    loading: false,
  },
})

export const useTaskDetailQuery = (props?: Props) => {
  const [state, setState] = useRecoilState(taskDetailQueryState)
  const { setTaskFromResponse } = useTask()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setState((s) => ({ ...s, loading: true }))
      const res = await fetchTask()
      setTaskFromResponse(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [props?.lazy, setState, setTaskFromResponse])

  const refetch = useCallback(() => {
    ;(async () => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetchTask()
      setTaskFromResponse(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [setState, setTaskFromResponse])

  return {
    refetch,
    loading: state.loading,
  }
}

const fetchTask = async (): Promise<TaskResponse> => {
  return new Promise<TaskResponse>((resolve) => {
    setTimeout(() => {
      resolve({
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
          {
            id: '3',
            taskId: '1',
            projectId: '1',
            name: 'Subtask 3',
            dueDate: '',
            dueTime: '',
            isDone: false,
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
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'test' }],
                  },
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'test' }],
                  },
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'test' }],
                  },
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'mention',
                        attrs: { mentionId: '2', mentionType: '1' },
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'mention',
                        attrs: { mentionId: '1', mentionType: '1' },
                      },
                    ],
                  },
                  { type: 'paragraph' },
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '🐠  ' }],
                  },
                  { type: 'paragraph' },
                  { type: 'paragraph' },
                ],
              },
              null,
              2,
            ),
            attachmentIds: [],
            createdAt: new Date('2021/05/20 18:12:41').toISOString(),
            updatedAt: '',
            isFirst: false,
            isPinned: false,
          },
          {
            id: '3',
            taskId: '1',
            teammateId: '1',
            description: JSON.stringify(
              {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '😜' }],
                  },
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'テキスト2' }],
                  },
                ],
              },
              null,
              2,
            ),
            attachmentIds: [],
            createdAt: new Date('2021/05/21 12:00:00').toISOString(),
            updatedAt: new Date().toISOString(),
            isFirst: false,
            isPinned: false,
          },
          {
            id: '4',
            taskId: '1',
            teammateId: '2',
            description: JSON.stringify(
              {
                type: 'doc',
                content: [{ type: 'text', text: '😜' }],
              },
              null,
              2,
            ),
            attachmentIds: ['1', '2', '3'],
            createdAt: new Date('2021/05/21 12:00:00').toISOString(),
            updatedAt: new Date().toISOString(),
            isFirst: false,
            isPinned: false,
          },
          {
            id: '5',
            taskId: '1',
            teammateId: '3',
            description: JSON.stringify(
              {
                type: 'doc',
                content: [],
              },
              null,
              2,
            ),
            attachmentIds: ['3'],
            createdAt: new Date('2021/05/21 12:00:00').toISOString(),
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
      })
    }, 300)
  })
}
