import { useRecoilCallback } from 'recoil'
import { useActivitiesResponse } from '../activities'
import { useInboxListStatusResponse } from '../inboxListStatus'
import { useMyTaskActivitiesResponse } from '../myTaskActivities'
import { useMyTaskActivityTasksResponse } from '../myTaskActivityTasks'
import { ActivityResponse } from '../type'
import { useWorkspaceActivitiesResponse } from '../workspaceActivities'
import { useWorkspaceActivityTasksResponse } from '../workspaceActivityTasks'

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse()
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse()
  const { setWorkspaceActivityTasks } = useWorkspaceActivityTasksResponse()
  const { setMyTaskActivities } = useMyTaskActivitiesResponse()
  const { setMyTaskActivityTasks } = useMyTaskActivityTasksResponse()
  const { setInboxListStatus } = useInboxListStatusResponse()

  const setActivity = useRecoilCallback(
    () => (data: ActivityResponse) => {
      setActivities(data)

      setWorkspaceActivities(data)
      setWorkspaceActivityTasks(data)

      setMyTaskActivities(data)
      setMyTaskActivityTasks(data)

      setInboxListStatus(data)
    },
    [
      setActivities,
      setMyTaskActivities,
      setMyTaskActivityTasks,
      setWorkspaceActivities,
      setWorkspaceActivityTasks,
      setInboxListStatus,
    ],
  )

  return {
    setActivity,
  }
}
