import { useRecoilCallback } from 'recoil'
import { useActivitiesResponse } from '../activities'
import { ActivityResponse } from '../type'
import { useWorkspaceActivitiesResponse } from '../workspaceActivities'

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse()
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse()

  const setActivity = useRecoilCallback(
    () => (data: ActivityResponse) => {
      setActivities(data)
      setWorkspaceActivities(data)
    },
    [setActivities, setWorkspaceActivities],
  )

  return {
    setActivity,
  }
}
