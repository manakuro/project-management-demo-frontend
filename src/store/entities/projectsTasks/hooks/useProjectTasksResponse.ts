import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { projectTaskState } from '../atom'
import { ProjectTaskResponse } from '../type'

export const useProjectTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setProjectTask = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskResponse[]) => {
        data.forEach((d) => {
          set(projectTaskState(d.id), d)
        })
        const tasks = data.map((d) => d.task)
        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setProjectTask,
  }
}
