import { useCallback, useEffect, useState } from 'react'
import { dateFns } from 'src/shared/dateFns'
import { useArchiveResponse } from 'src/store/app/inbox/archive'
import { ArchiveResponse } from 'src/store/app/inbox/archive'

type Props = {
  lazy?: boolean
}

export const useInboxArchiveQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setArchive } = useArchiveResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setLoading(true)
      const res = await fetch()
      await setArchive(res)
      setLoading(false)
    })()
  }, [props?.lazy, setArchive])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch()
      await setArchive(res)
      setLoading(false)
    })()
  }, [setArchive])

  return {
    refetch,
    loading,
  }
}

const fetch = async (): Promise<ArchiveResponse> => {
  return new Promise<ArchiveResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        archives: [
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
          {
            id: '3',
            type: 1,
            updatedAt: new Date(dateFns.subDays(new Date(), 1)).toISOString(),
          },
          {
            id: '4',
            type: 1,
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
          {
            id: '5',
            type: 1,
            updatedAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
          },
          {
            id: '6',
            type: 1,
            updatedAt: new Date(new Date()).toISOString(),
          },
        ],
        archivedWorkspaceActivities: [
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
            archivedWorkspaceActivityTasks: [
              {
                id: '1',
                archivedWorkspaceActivityId: '1',
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
                id: '2',
                archivedWorkspaceActivityId: '1',
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
                  createdBy: '2',
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
            archivedWorkspaceActivityTasks: [
              {
                id: '3',
                archivedWorkspaceActivityId: '2',
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
                  createdBy: '2',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
        ],
        archivedMyTaskActivities: [
          {
            id: '3',
            activityType: 1,
            teammateId: '1',
            archivedMyTaskActivityTasks: [
              {
                id: '1',
                archivedMyTaskActivityId: '3',
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
                id: '2',
                archivedMyTaskActivityId: '3',
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
                  createdBy: '2',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
          {
            id: '4',
            activityType: 1,
            teammateId: '1',
            archivedMyTaskActivityTasks: [
              {
                id: '3',
                archivedMyTaskActivityId: '4',
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
                  createdBy: '2',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
          {
            id: '5',
            activityType: 1,
            teammateId: '1',
            archivedMyTaskActivityTasks: [
              {
                id: '4',
                archivedMyTaskActivityId: '5',
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
                  createdBy: '2',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
          {
            id: '6',
            activityType: 1,
            teammateId: '1',
            archivedMyTaskActivityTasks: [
              {
                id: '5',
                archivedMyTaskActivityId: '6',
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
                  createdBy: '2',
                },
                createdAt: '',
                updatedAt: '',
              },
            ],
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
        ],
      })
    }, 500)
  })
}
