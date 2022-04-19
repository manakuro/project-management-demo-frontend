import { useRecoilCallback } from 'recoil'
import { archiveState } from '../atom'
import { ArchivedActivityResponse, ArchiveActivity } from '../type'

export const useArchivesResponse = () => {
  const setArchives = useRecoilCallback(
    ({ set }) =>
      (data: ArchivedActivityResponse[]) => {
        data.forEach((a) => {
          set(archiveState(a.id), a as ArchiveActivity)
        })
      },
    [],
  )

  return {
    setArchives,
  }
}
