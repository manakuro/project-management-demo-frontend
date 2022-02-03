import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { teammateTaskState } from '../atom'
import { TeammateTaskResponse } from '../type'

export const useTeammateTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setTeammateTask = useRecoilCallback(
    ({ set }) =>
      (data: TeammateTaskResponse[]) => {
        data.forEach((d) => {
          set(teammateTaskState(d.id), d)
        })
        const tasks = data.map((d) => d.task)
        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setTeammateTask,
  }
}
