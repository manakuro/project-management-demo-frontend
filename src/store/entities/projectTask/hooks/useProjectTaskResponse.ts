import { useRecoilCallback } from 'recoil'
import { type TaskResponse, useTasksResponse } from 'src/store/entities/task'
import { projectTaskState } from '../atom'
import type { ProjectTaskResponse } from '../type'

export const useProjectTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setProjectTask = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskResponse[], options?: { includeTask?: boolean }) => {
        const includeTask = options?.includeTask ?? true

        data.forEach((d) => {
          set(projectTaskState(d.id), d)
        })
        if (!includeTask) return

        const tasks = data.map<TaskResponse>((d) => d.task)
        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setProjectTask,
  }
}
