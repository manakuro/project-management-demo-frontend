import { useRecoilCallback } from 'recoil'
import { archivedWorkspaceActivityState } from '../atom'
import { ArchivedWorkspaceActivityResponse } from '../type'

export const useArchivedWorkspaceActivitiesResponse = () => {
  const setArchivedWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchivedWorkspaceActivityResponse[]) => {
        data.forEach((w) => {
          set(archivedWorkspaceActivityState(w.id), w)
        })
      },
    [],
  )

  return {
    setArchivedWorkspaceActivities,
  }
}
