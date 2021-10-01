import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { taskSectionState } from '../atom'
import { TaskSectionResponse } from '../type'

export const useTaskSectionsResponse = () => {
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
