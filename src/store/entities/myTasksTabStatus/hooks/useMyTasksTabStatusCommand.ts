import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { tabStatusState } from '../atom'
import {
  MyTasksTabStatus,
  MyTasksTabStatusCode,
  MyTasksTabStatusCodeKey,
} from '../type'

export const useMyTasksTabStatusCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<MyTasksTabStatus>) => {
        set(tabStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  const setTabStatus = useCallback(
    (key: MyTasksTabStatusCodeKey) => {
      upsert({ status: MyTasksTabStatusCode[key] })
    },
    [upsert],
  )

  return {
    upsert,
    setTabStatus,
  }
}
