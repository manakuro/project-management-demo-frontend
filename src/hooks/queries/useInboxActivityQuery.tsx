import { useCallback, useEffect, useState } from 'react'
import { dateFns } from 'src/shared/dateFns'
import { uuid } from 'src/shared/uuid'
import { useActivityResponse } from 'src/store/app/inbox/activity'
import { ActivityResponse } from 'src/store/app/inbox/activity/'

type Props = {
  lazy?: boolean
}

export const useInboxActivityQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setActivity } = useActivityResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetch()
      await setActivity(res)
      setLoading(false)
    })()
  }, [props?.lazy, setActivity])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch()
      await setActivity(res)
      setLoading(false)
    })()
  }, [setActivity])

  return {
    refetch,
    loading,
  }
}

const fetch = async (): Promise<ActivityResponse> => {
  return new Promise<ActivityResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        activities: [
          {
            id: '1',
            type: 2,
            updatedAt: new Date(dateFns.subDays(new Date(), 3)).toISOString(),
          },
          {
            id: '2',
            type: 2,
            updatedAt: new Date(dateFns.subDays(new Date(), 4)).toISOString(),
          },
        ],
        workspaceActivities: [
          {
            id: '1',
            activityType: 2,
            workspace: {
              id: '1',
              name: 'My Workspace',
            },
            workspaceId: '1',
            project: {
              id: '1',
              name: 'Asana',
            },
            projectId: '1',
            teammateId: '1',
            tasks: [
              {
                id: uuid(),
                workspaceActivityId: '1',
                taskId: '1',
                task: {
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
                  dueDate: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
                  dueTime: new Date(
                    dateFns.addDays(new Date(), 3),
                  ).toISOString(),
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
                  doneAt: new Date(
                    dateFns.subDays(new Date(), 1),
                  ).toISOString(),
                  createdBy: '1',
                },
                createdAt: '',
                updatedAt: '',
              },
              {
                id: uuid(),
                workspaceActivityId: '1',
                taskId: '2',
                task: {
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
                  dueDate: new Date(
                    dateFns.addDays(new Date(), 4),
                  ).toISOString(),
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
                  doneAt: new Date(
                    dateFns.subDays(new Date(), 3),
                  ).toISOString(),
                  createdBy: '1',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
          {
            id: '2',
            activityType: 2,
            workspace: {
              id: '1',
              name: 'My Workspace',
            },
            workspaceId: '1',
            project: {
              id: '2',
              name: 'Asana 2',
            },
            projectId: '2',
            teammateId: '1',
            tasks: [
              {
                id: uuid(),
                workspaceActivityId: '2',
                taskId: '3',
                task: {
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
                  dueDate: new Date(
                    dateFns.addDays(new Date(), 5),
                  ).toISOString(),
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
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
        ],
        taskActivities: [],
      })
    }, 500)
  })
}
