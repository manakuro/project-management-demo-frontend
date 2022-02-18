import { useRecoilCallback } from 'recoil'
import { taskFeedState } from '../atom'

export const useReset = () => {
  const resetTaskFeed = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskFeedState(id))
      },
    [],
  )

  return {
    resetTaskFeed,
  }
}
