import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import { DeletedTask } from '../type'
import { useUpsert } from './useUpsert'

export const useDeletedTaskCommand = () => {
  const { upsert } = useUpsert()

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
