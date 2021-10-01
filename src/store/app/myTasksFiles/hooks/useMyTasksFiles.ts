import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { attachmentIdsState } from '../atom'

export const useMyTasksFiles = () => {
  const { me } = useMe()
  const ids = useRecoilValue(attachmentIdsState(me.id))
  const attachmentIds = useMemo(() => ids, [ids])

  return {
    attachmentIds,
  }
}
