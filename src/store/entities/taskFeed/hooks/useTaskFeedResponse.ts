import { useRecoilCallback } from 'recoil'
import { TaskFeedResponse } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskFeedResponse = () => {
  const { upsert } = useUpsert()

  const setTaskFeed = useRecoilCallback(
    () => (data: TaskFeedResponse[]) => {
      data.forEach((d) => {
        upsert(d)
      })
    },
    [upsert],
  )

  return {
    setTaskFeed,
  }
}
