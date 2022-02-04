import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { taskSectionState } from '../atom'
import { TaskSectionResponse } from '../type'

export const useTaskSectionResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: TaskSectionResponse[]) => {
        data.forEach((d) => {
          set(taskSectionState(d.id), d)
          setTasksFromResponse(d.tasks)
        })
      },
    [setTasksFromResponse],
  )

  return {
    setTaskSections,
  }
}
