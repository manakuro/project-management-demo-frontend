import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'
import { DeletedTask } from '../type'

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
