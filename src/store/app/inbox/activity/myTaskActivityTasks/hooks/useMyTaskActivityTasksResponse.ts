import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { ActivityResponse } from '../../type'
import { myTaskActivityTaskState } from '../atom'

export const useMyTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setMyTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.myTaskActivities.forEach((d) => {
          d.myTaskActivityTasks.forEach((t) => {
            set(myTaskActivityTaskState(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setMyTaskActivityTasks,
  }
}
