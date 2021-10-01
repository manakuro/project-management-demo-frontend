import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archivedMyTaskActivityState } from '../atom'

export const useArchivedMyTaskActivitiesResponse = () => {
  const setArchivedMyTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          set(archivedMyTaskActivityState(d.id), d)
        })
      },
    [],
  )

  return {
    setArchivedMyTaskActivities,
  }
}
