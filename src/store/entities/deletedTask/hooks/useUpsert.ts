import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import type { DeletedTask } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: DeletedTask) => {
        set(deletedTaskState(input.id), input)
      },
    [],
  )

  return {
    upsert,
  }
}
