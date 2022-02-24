import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import { DeletedTask } from '../type'

export const useDeletedTaskCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: DeletedTask) => {
        set(deletedTaskState(val.id), val)
      },
    [],
  )

  const setDeletedTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<DeletedTask>) => {
        const prev = await snapshot.getPromise(deletedTaskState(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  return {
    setDeletedTaskById,
  }
}
