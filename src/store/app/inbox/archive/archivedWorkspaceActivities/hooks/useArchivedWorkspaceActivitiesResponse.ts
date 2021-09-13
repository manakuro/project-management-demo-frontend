import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archivedWorkspaceActivitySelector } from '../atom'

export const useArchivedWorkspaceActivitiesResponse = () => {
  const setArchivedWorkspaceActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedWorkspaceActivities.forEach((w) => {
          set(archivedWorkspaceActivitySelector(w.id), w)
        })
      },
    [],
  )

  return {
    setArchivedWorkspaceActivities,
  }
}
