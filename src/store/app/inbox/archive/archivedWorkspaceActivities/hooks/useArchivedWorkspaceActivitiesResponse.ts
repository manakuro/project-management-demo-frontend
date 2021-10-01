import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archivedWorkspaceActivityState } from '../atom'

export const useArchivedWorkspaceActivitiesResponse = () => {
  const setArchivedWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedWorkspaceActivities.forEach((w) => {
          set(archivedWorkspaceActivityState(w.id), w)
        })
      },
    [],
  )

  return {
    setArchivedWorkspaceActivities,
  }
}
