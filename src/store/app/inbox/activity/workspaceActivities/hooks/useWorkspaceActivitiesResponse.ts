import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { workspaceActivityState } from '../atom'

export const useWorkspaceActivitiesResponse = () => {
  const setWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.workspaceActivities.forEach((w) => {
          set(workspaceActivityState(w.id), w)
        })
      },
    [],
  )

  return {
    setWorkspaceActivities,
  }
}
