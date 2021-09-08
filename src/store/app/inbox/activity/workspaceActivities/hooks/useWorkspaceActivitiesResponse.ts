import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { workspaceActivitySelector } from '../atom'

export const useWorkspaceActivitiesResponse = () => {
  const setWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.workspaceActivities.forEach((w) => {
          set(workspaceActivitySelector(w.id), w)
        })
      },
    [],
  )

  return {
    setWorkspaceActivities,
  }
}
