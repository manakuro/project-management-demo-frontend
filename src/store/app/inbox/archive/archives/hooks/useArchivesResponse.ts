import { useRecoilCallback } from 'recoil'
import { ArchiveResponse } from '../../type'
import { archiveSelector } from '../atom'

export const useArchivesResponse = () => {
  const setArchives = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archives.forEach((a) => {
          set(archiveSelector(a.id), a)
        })
      },
    [],
  )

  return {
    setArchives,
  }
}
