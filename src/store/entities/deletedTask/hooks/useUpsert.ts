import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import { DeletedTask } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: DeletedTask) => {
        set(deletedTaskState(val.id), val)
      },
    [],
  )

  return {
    upsert,
  }
}
