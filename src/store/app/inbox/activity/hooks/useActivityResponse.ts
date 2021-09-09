import { useRecoilCallback } from 'recoil'
import { useActivitiesResponse } from '../activities'
import { ActivityResponse } from '../type'
import { useWorkspaceActivitiesResponse } from '../workspaceActivities'
import { useWorkspaceActivityTasksResponse } from '../workspaceActivityTasks'

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse()
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse()
  const { setWorkspaceActivityTasks } = useWorkspaceActivityTasksResponse()

  const setActivity = useRecoilCallback(
    () => (data: ActivityResponse) => {
      setActivities(data)
      setWorkspaceActivities(data)
      setWorkspaceActivityTasks(data)
    },
    [setActivities, setWorkspaceActivities, setWorkspaceActivityTasks],
  )

  return {
    setActivity,
  }
}
