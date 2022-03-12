import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import { DeletedTask } from '../type'
import { useUpsert } from './useUpsert'

export const useDeletedTaskCommand = () => {
  const { upsert } = useUpsert()

  const setDeletedTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, input: Partial<DeletedTask>) => {
        const prev = await snapshot.getPromise(deletedTaskState(taskId))
        upsert({
          ...prev,
          ...input,
        })
      },
    [upsert],
  )

  return {
    setDeletedTaskById,
  }
}
