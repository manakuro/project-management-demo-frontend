import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { feedIdsByTaskIdSelector } from 'src/store/entities/feeds'

export const useFeedIdsByTaskId = (taskId: string) => {
  const ids = useRecoilValue(feedIdsByTaskIdSelector(taskId))

  const feedIds = useMemo(() => {
    return ids
  }, [ids])

  return {
    feedIds,
  }
}
