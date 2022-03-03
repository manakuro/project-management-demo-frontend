import { useRecoilCallback } from 'recoil'
import { tabStatusState } from '../atom'

export const useResetTeammateTask = () => {
  const resetTeammateTask = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(tabStatusState)
      },
    [],
  )

  return {
    resetTeammateTask,
  }
}
