import { useRecoilCallback } from 'recoil'
import { useActivitiesResponse } from '../activities'
import { useInboxListStatusResponse } from '../inboxListStatus'
import { useTaskActivitiesResponse } from '../taskActivities'
import { useTaskActivityTasksResponse } from '../taskActivityTasks'
import { ActivityResponse } from '../type'
import { useWorkspaceActivitiesResponse } from '../workspaceActivities'
import { useWorkspaceActivityTasksResponse } from '../workspaceActivityTasks'

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse()
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse()
  const { setWorkspaceActivityTasks } = useWorkspaceActivityTasksResponse()
  const { setTaskActivities } = useTaskActivitiesResponse()
  const { setTaskActivityTasks } = useTaskActivityTasksResponse()
  const { setInboxListStatus } = useInboxListStatusResponse()

  const setActivity = useRecoilCallback(
    () => (data: ActivityResponse) => {
      setActivities(data)

      setWorkspaceActivities(data)
      setWorkspaceActivityTasks(data)

      setTaskActivities(data)
      setTaskActivityTasks(data)

      setInboxListStatus(data)
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
