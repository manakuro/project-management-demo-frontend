import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskResponse, useTasksResponse } from 'src/store/entities/task'
import { deletedTaskState } from '../atom'
import { DeletedTaskResponse } from '../type'

export const useDeletedTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setDeletedTask = useRecoilCallback(
    ({ set }) =>
      (data: DeletedTaskResponse[]) => {
        data.forEach((d) => {
          set(deletedTaskState(d.id), d)
        })

        const tasks = data.map<TaskResponse>((d) => ({
          ...d.task,
          taskSectionId: '',
        }))

        setTasksFromResponse(uniqBy(tasks, 'id'))
      },
    [setTasksFromResponse],
  )

  return {
    setDeletedTask,
  }
}
