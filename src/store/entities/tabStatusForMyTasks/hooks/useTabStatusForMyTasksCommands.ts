import { useRecoilCallback } from 'recoil'
import { tabStatusForMyTasks } from '../atom'
import { TabStatusForMyTasks } from '../type'

export const useTabStatusForMyTasksCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TabStatusForMyTasks>) => {
        set(tabStatusForMyTasks, (prev) => ({
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
