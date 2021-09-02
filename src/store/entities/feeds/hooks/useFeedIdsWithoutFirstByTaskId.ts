import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { feedIdsWithoutFirstSelector } from 'src/store/entities/feeds'

export const useFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useRecoilValue(feedIdsWithoutFirstSelector(taskId))

  const feedIds = useMemo(() => {
    return ids
  }, [ids])

  return {
    feedIdsWithoutFirst: feedIds,
  }
}
