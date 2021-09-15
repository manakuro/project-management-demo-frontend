import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archivedMyTaskActivitySelector } from '../atom'

export const useArchivedMyTaskActivitiesResponse = () => {
  const setArchivedMyTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          set(archivedMyTaskActivitySelector(d.id), d)
        })
      },
    [],
  )

  return {
    setArchivedMyTaskActivities,
  }
}
