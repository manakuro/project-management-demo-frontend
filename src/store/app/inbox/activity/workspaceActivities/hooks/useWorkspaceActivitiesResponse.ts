import { useRecoilCallback } from 'recoil'
import { workspaceActivityState } from '../atom'
import { WorkspaceActivityResponse } from '../type'

export const useWorkspaceActivitiesResponse = () => {
  const setWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceActivityResponse[]) => {
        data.forEach((w) => {
          set(workspaceActivityState(w.id), w)
        })
      },
    [],
  )

  return {
    setWorkspaceActivities,
  }
}
