import { useRecoilCallback } from 'recoil'
import { tabStatusForMyTasksState } from '../atom'
import { TabStatusForMyTasks } from '../type'

export const useTabStatusForMyTasksCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TabStatusForMyTasks>) => {
        set(tabStatusForMyTasksState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}
