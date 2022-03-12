import { useRecoilCallback } from 'recoil'
import { TaskTagResponse } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskTagResponse = () => {
  const { upsert } = useUpsert()

  const setTaskTag = useRecoilCallback(
    () => (data: TaskTagResponse[]) => {
      data.forEach((d) => {
        upsert(d)
      })
    },
    [upsert],
  )

  return {
    setTaskTag,
  }
}
