import { useCallback, useEffect, useState } from 'react'
import { dateFns } from 'src/shared/dateFns'
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
          {
            id: '3',
            type: 2,
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
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
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
          },
        ],
        taskActivities: [],
      })
    }, 500)
  })
}
