import { useRecoilValue } from 'recoil'
import { archiveSelector } from '../atom'

export const useArchive = (archiveId: string) => {
  const archive = useRecoilValue(archiveSelector(archiveId))

  return {
    archive,
  }
}
