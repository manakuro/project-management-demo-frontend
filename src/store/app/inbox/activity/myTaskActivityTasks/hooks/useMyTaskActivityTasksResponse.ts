import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { ActivityResponse } from '../../type'
import { myTaskActivityTaskSelector } from '../atom'

export const useMyTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setMyTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.myTaskActivities.forEach((d) => {
          d.myTaskActivityTasks.forEach((t) => {
            set(myTaskActivityTaskSelector(t.id), t)

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
