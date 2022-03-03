import { useRecoilCallback } from 'recoil'
import { taskFeedState } from '../atom'

export const useResetTaskFeed = () => {
  const resetTaskFeed = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskFeedState(id))
      },
    [],
  )

  const resetTaskFeeds = useRecoilCallback(
    ({ reset }) =>
      (teammateTasks: string[]) => {
        teammateTasks.forEach((id) => {
          reset(taskFeedState(id))
        })
      },
    [],
  )

  return {
    resetTaskFeed,
    resetTaskFeeds,
  }
}
