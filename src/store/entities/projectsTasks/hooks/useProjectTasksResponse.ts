import { useRecoilCallback } from 'recoil'
import { TaskResponse, useTasksResponse } from 'src/store/entities/tasks'
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
        const tasks = data.map<TaskResponse>((d) => ({
          ...d.task,
          taskSectionId: d.projectTaskSectionId,
        }))
        setTasksFromResponse(tasks)
      },
    [setTasksFromResponse],
  )

  return {
    setProjectTask,
  }
}
