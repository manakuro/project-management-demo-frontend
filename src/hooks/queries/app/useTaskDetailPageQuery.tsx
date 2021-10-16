import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { taskSections } from 'src/hooks/queries/app/useMyTasksPageQuery'
import { dateFns } from 'src/shared/dateFns'
import { TaskResponse, useTaskResponse } from 'src/store/entities/tasks'

type Props = {
  lazy?: boolean
}

const taskDetailQueryState = atom<{ loading: boolean }>({
  key: 'taskDetailQueryState',
  default: {
    loading: false,
  },
})

export const useTaskDetailPageQuery = (props?: Props) => {
  const [state, setState] = useRecoilState(taskDetailQueryState)
  const { setTaskFromResponse } = useTaskResponse()

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
        id: taskSections[0].tasks[0].id,
        taskSectionId: '1',
        projects: taskSections[0].tasks[0].projects,
        name: 'Resolve an issue of auto focus for tasks list detail page',
        dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
        dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
        isDone: true,
        subTasks: [
          {
            assigneeId: '1',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: taskSections[0].tasks[0].subTasks[0].id,
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
            doneAt: '',
            createdBy: '1',
            createdAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
          },
          {
            assigneeId: '1',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: taskSections[0].tasks[0].subTasks[1].id,
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
            doneAt: '',
            createdBy: '1',
            createdAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
          },
          {
            assigneeId: '1',
            attachments: [],
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            dueTime: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            feeds: [],
            id: taskSections[0].tasks[0].subTasks[2].id,
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
            doneAt: '',
            createdBy: '1',
            createdAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
          },
        ],
        assigneeId: '1',
        attachments: [
          {
            id: '1',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
            name: '/images/cat_img.png',
            src: '/images/cat_img.png',
            createdAt: new Date().toISOString(),
            type: 1,
            status: 1,
          },
          {
            id: '2',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
            name: '/images/screen_shot.png',
            src: '/images/screen_shot.png',
            createdAt: new Date().toISOString(),
            type: 1,
            status: 1,
          },
          {
            id: '3',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
            name: '/files/pdf-test.pdf',
            src: '/files/pdf-test.pdf',
            createdAt: new Date().toISOString(),
            type: 2,
            status: 1,
          },
          {
            id: '4',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
            name: '/files/pdf-test-2.pdf',
            src: '/files/pdf-test-2.pdf',
            createdAt: new Date().toISOString(),
            type: 2,
            status: 1,
          },
          {
            id: '5',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
            name: 'コンピュータシステムの理論と実践',
            src: '/files/コンピュータシステムの理論と実践.pdf',
            createdAt: new Date().toISOString(),
            type: 2,
            status: 1,
          },
          {
            id: '6',
            taskId: taskSections[0].tasks[0].id,
            projectId: '1',
            feedId: '4',
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
            createdAt: new Date('2021/05/21 12:00:00').toISOString(),
            updatedAt: new Date().toISOString(),
            isFirst: false,
            isPinned: false,
          },
        ],
        teammates: taskSections[0].tasks[0].teammates,
        tags: taskSections[0].tasks[0].tags,
        isNew: false,
        isDeleted: false,
        taskParentId: '',
        doneAt: new Date(dateFns.subDays(new Date(), 3)).toISOString(),
        createdBy: '1',
        createdAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
        updatedAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
      })
    }, 300)
  })
}
