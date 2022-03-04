import { useRecoilCallback } from 'recoil'
import { TaskResponse, useTasksResponse } from 'src/store/entities/task'
import { teammateTaskState } from '../atom'
import { TeammateTaskResponse } from '../type'

export const useTeammateTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setTeammateTask = useRecoilCallback(
    ({ set }) =>
      (data: TeammateTaskResponse[], options?: { includeTask?: boolean }) => {
        const includeTask = options?.includeTask ?? true

        data.forEach((d) => {
          set(teammateTaskState(d.id), d)
        })
        if (!includeTask) return

        const tasks = data.map<TaskResponse>((d) => d.task)

        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setTeammateTask,
  }
}
