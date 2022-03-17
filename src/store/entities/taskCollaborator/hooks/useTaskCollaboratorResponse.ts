import { useRecoilCallback } from 'recoil'
import { taskCollaboratorState } from '../atom'
import { TaskCollaboratorResponse } from '../type'

export const useTaskCollaboratorResponse = () => {
  const setTaskCollaborators = useRecoilCallback(
    ({ set }) =>
      (data: TaskCollaboratorResponse[]) => {
        data.forEach((d) => {
          set(taskCollaboratorState(d.id), (prev) => {
            return {
              ...prev,
              ...d,
            }
          })
        })
      },
    [],
  )

  return {
    setTaskCollaborators,
  }
}
