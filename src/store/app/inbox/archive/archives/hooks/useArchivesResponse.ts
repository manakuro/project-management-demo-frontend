import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archiveState } from '../atom'

export const useArchivesResponse = () => {
  const setArchives = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archives.forEach((a) => {
          set(archiveState(a.id), a)
        })
      },
    [],
  )

  return {
    setArchives,
  }
}
