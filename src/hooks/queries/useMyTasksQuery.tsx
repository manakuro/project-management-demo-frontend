import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { useMyTasks } from 'src/store/app/myTasks'
import { MyTaskResponse } from 'src/store/app/myTasks'

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
export const taskSections: MyTaskResponse['taskSections'] = [
  {
    id: '1',
    name: 'Recently assigned',
    teammateId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tasks: [
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
        subTasks: [
          {
            assigneeId: '',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: '1-1',
            isDeleted: false,
            isDone: false,
            isNew: false,
            name: 'Subtask 1',
            projects: [],
            subTasks: [],
            tags: [],
            taskSectionId: '1',
            teammates: [],
            taskParentId: '1',
          },
          {
            assigneeId: '',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: '1-2',
            isDeleted: false,
            isDone: false,
            isNew: false,
            name: 'Subtask 2',
            projects: [],
            subTasks: [],
            tags: [],
            taskSectionId: '1',
            teammates: [],
            taskParentId: '1',
          },
          {
            assigneeId: '1',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: '1-3',
            isDeleted: false,
            isDone: false,
            isNew: false,
            name: 'Subtask 3',
            projects: [],
            subTasks: [],
            tags: [],
            taskSectionId: '1',
            teammates: [],
            taskParentId: '1',
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
        tags: [
          {
            id: '1',
            taskId: '1',
            name: 'Medium',
            color: {
              id: '1',
              name: 'gray.200',
              color: 'gray.200',
            },
            createdAt: '',
            updatedAt: '',
          },
        ],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
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
        tags: [
          {
            id: '1',
            taskId: '2',
            name: 'Medium',
            color: {
              id: '1',
              name: 'gray.200',
              color: 'gray.200',
            },
            createdAt: '',
            updatedAt: '',
          },
          {
            id: '2',
            taskId: '2',
            name: 'Asana',
            color: {
              id: '2',
              name: 'pink.200',
              color: 'pink.200',
            },
            createdAt: '',
            updatedAt: '',
          },
        ],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
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
        dueDate: new Date('2021/06/01').toISOString(),
        isDone: false,
        subTasks: [],
        assigneeId: '',
        attachments: [],
        feeds: [],
        teammates: [],
        tags: [],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
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
        dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
        isDone: false,
        subTasks: [],
        assigneeId: '',
        attachments: [],
        feeds: [],
        teammates: [],
        tags: [],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
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
        dueDate: new Date(dateFns.addDays(new Date(), 6)).toISOString(),
        isDone: false,
        subTasks: [],
        assigneeId: '',
        attachments: [],
        feeds: [],
        teammates: [],
        tags: [],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
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
        subTasks: [
          {
            assigneeId: '',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: '10-1',
            isDeleted: false,
            isDone: false,
            isNew: false,
            name: 'Subtask 10',
            projects: [],
            subTasks: [],
            tags: [],
            taskSectionId: '2',
            teammates: [],
            taskParentId: '10',
          },
          {
            assigneeId: '',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: '10-2',
            isDeleted: false,
            isDone: false,
            isNew: false,
            name: 'Subtask 11',
            projects: [],
            subTasks: [],
            tags: [],
            taskSectionId: '2',
            teammates: [],
            taskParentId: '10',
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
        tags: [],
        isNew: false,
        isDeleted: false,
        taskParentId: '',
      },
    ],
  },
]

const fetchTasks = async (): Promise<MyTaskResponse> => {
  return new Promise<MyTaskResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        taskSections,
        taskColumns: [
          {
            id: '1',
            fieldId: '',
            projectId: '1',
            teammateId: '1',
            name: 'Task name',
            width: '60%',
            type: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: '2',
            fieldId: '',
            projectId: '1',
            teammateId: '1',
            name: 'Due date',
            width: '12%',
            type: 3,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: '3',
            fieldId: '',
            projectId: '1',
            teammateId: '1',
            name: 'Projects',
            width: '12%',
            type: 4,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: '4',
            fieldId: '',
            projectId: '1',
            teammateId: '1',
            name: 'Tags',
            width: '12%',
            type: 5,
            createdAt: '',
            updatedAt: '',
          },
        ],
        taskStatus: {
          id: '1',
          taskListStatus: 1,
          sortStatus: 1,
        },
      })
    }, 1000)
  })
}
