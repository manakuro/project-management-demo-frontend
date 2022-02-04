import { useRecoilCallback } from 'recoil'
import { TaskResponse, useTasksResponse } from 'src/store/entities/task'
import { projectTaskState } from '../atom'
import { ProjectTaskResponse } from '../type'

export const useProjectTaskResponse = () => {
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
