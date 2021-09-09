import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { ActivityResponse } from '../../type'
import { workspaceActivityTaskSelector } from '../atom'

export const useWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setWorkspaceActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.workspaceActivities.forEach((w) => {
          w.workspaceActivityTasks.forEach((t) => {
            set(workspaceActivityTaskSelector(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setWorkspaceActivityTasks,
  }
}
