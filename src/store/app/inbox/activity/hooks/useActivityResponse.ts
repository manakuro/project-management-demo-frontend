import { useRecoilCallback } from 'recoil'
import { InboxActivityPageQuery } from 'src/graphql/types/app/inbox'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { useActivitiesResponse } from '../activities'
import { useInboxListStatusResponse } from '../inboxListStatus'
import {
  useTaskActivitiesResponse,
  TaskActivityResponse,
} from '../taskActivities'
import {
  useTaskActivityTasksResponse,
  TaskActivityTaskResponse,
} from '../taskActivityTasks'
import { ActivityResponse } from '../type'
import {
  useWorkspaceActivitiesResponse,
  WorkspaceActivityResponse,
} from '../workspaceActivities'
import {
  useWorkspaceActivityTasksResponse,
  WorkspaceActivityTaskResponse,
} from '../workspaceActivityTasks'

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse()
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse()
  const { setWorkspaceActivityTasks } = useWorkspaceActivityTasksResponse()
  const { setTaskActivities } = useTaskActivitiesResponse()
  const { setTaskActivityTasks } = useTaskActivityTasksResponse()
  const { setInboxListStatus } = useInboxListStatusResponse()

  const setActivity = useRecoilCallback(
    () => (data: ActivityResponse) => {
      setActivities(data.activities)

      const workspaceActivities = getNodesFromEdges<
        WorkspaceActivityResponse,
        InboxActivityPageQuery['workspaceActivities']
      >(data.workspaceActivities)

      const workspaceActivityTasks = workspaceActivities.reduce(
        (acc, w) => [...acc, ...w.workspaceActivityTasks],
        [] as WorkspaceActivityTaskResponse[],
      )
      setWorkspaceActivities(workspaceActivities)
      setWorkspaceActivityTasks(workspaceActivityTasks)

      const taskActivities = getNodesFromEdges<
        TaskActivityResponse,
        InboxActivityPageQuery['taskActivities']
      >(data.taskActivities)

      const taskActivityTasks = taskActivities.reduce(
        (acc, w) => [...acc, ...w.taskActivityTasks],
        [] as TaskActivityTaskResponse[],
      )

      setTaskActivities(taskActivities)
      setTaskActivityTasks(taskActivityTasks)

      setInboxListStatus({
        id: '1',
        teammateId: '1',
        filterStatus: 1,
        createdAt: '',
        updatedAt: '',
      })
    },
    [
      setActivities,
      setTaskActivities,
      setTaskActivityTasks,
      setWorkspaceActivities,
      setWorkspaceActivityTasks,
      setInboxListStatus,
    ],
  )

  return {
    setActivity,
  }
}
