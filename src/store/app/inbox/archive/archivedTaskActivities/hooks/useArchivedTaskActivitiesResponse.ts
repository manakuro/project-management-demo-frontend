import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archivedTaskActivityState } from '../atom'

export const useArchivedTaskActivitiesResponse = () => {
  const setArchivedTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          set(archivedTaskActivityState(d.id), d)
        })
      },
    [],
  )

  return {
    setArchivedTaskActivities,
  }
}
