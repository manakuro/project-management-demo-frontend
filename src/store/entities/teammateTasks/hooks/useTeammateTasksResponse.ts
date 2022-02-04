import { useRecoilCallback } from 'recoil'
import { TaskResponse, useTasksResponse } from 'src/store/entities/tasks'
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
        const tasks = data.map<TaskResponse>((d) => ({
          ...d.task,
          taskSectionId: d.teammateTaskSectionId,
        }))

        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setTeammateTask,
  }
}
