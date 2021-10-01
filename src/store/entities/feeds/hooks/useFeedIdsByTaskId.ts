import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { feedIdsByTaskIdState } from 'src/store/entities/feeds'

export const useFeedIdsByTaskId = (taskId: string) => {
  const ids = useRecoilValue(feedIdsByTaskIdState(taskId))

  const feedIds = useMemo(() => {
    return ids
  }, [ids])

  return {
    feedIds,
  }
}
