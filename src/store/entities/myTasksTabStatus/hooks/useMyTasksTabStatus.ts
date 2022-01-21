import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { tabStatusState } from '../atom'
import { MyTasksTabStatusCodeKey, MyTasksTabStatusCode } from '../type'

export const useMyTasksTabStatus = () => {
  const state = useRecoilValue(tabStatusState)

  const isTabStatus = useCallback(
    (key: MyTasksTabStatusCodeKey) =>
      state.status === MyTasksTabStatusCode[key],
    [state.status],
  )

  return {
    myTasksTabStatus: state,
    isTabStatus,
  }
}
