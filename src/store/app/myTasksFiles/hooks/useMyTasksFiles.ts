import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { attachmentIdsSelector } from '../atom'

export const useMyTasksFiles = () => {
  const { me } = useMe()
  const ids = useRecoilValue(attachmentIdsSelector(me.id))
  const attachmentIds = useMemo(() => ids, [ids])

  return {
    attachmentIds,
  }
}
