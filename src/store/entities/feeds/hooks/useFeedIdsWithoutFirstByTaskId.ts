import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { feedIdsWithoutFirstState } from 'src/store/entities/feeds'

export const useFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useRecoilValue(feedIdsWithoutFirstState(taskId))

  const feedIds = useMemo(() => {
    return ids
  }, [ids])

  return {
    feedIdsWithoutFirst: feedIds,
  }
}
