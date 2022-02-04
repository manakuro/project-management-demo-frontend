import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { ActivityResponse } from '../../type'
import { workspaceActivityTaskState } from '../atom'

export const useWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setWorkspaceActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.workspaceActivities.forEach((w) => {
          w.workspaceActivityTasks.forEach((t) => {
            set(workspaceActivityTaskState(t.id), t)

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
