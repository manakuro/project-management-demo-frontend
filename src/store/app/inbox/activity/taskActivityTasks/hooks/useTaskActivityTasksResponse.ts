import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { ActivityResponse } from '../../type'
import { taskActivityTaskSelector } from '../atom'

export const useTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.taskActivities.forEach((d) => {
          d.taskActivityTasks.forEach((t) => {
            set(taskActivityTaskSelector(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setTaskActivityTasks,
  }
}
