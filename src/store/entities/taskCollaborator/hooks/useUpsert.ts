import { useRecoilCallback } from 'recoil'
import { taskCollaboratorState } from '../atom'
import { TaskCollaborator } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: TaskCollaborator) => {
        set(taskCollaboratorState(input.id), (prev) => {
          return {
            ...prev,
            ...input,
          }
        })
      },
    [],
  )

  return {
    upsert,
  }
}
