import { useRecoilCallback, useRecoilValue } from 'recoil'
import { teammateTaskState } from '../atom'
import { TeammateTask } from '../type'

export const useTeammateTask = (teammateTaskId?: string) => {
  const teammateTask = useRecoilValue(teammateTaskState(teammateTaskId || ''))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (teammateTask: TeammateTask) => {
        set(teammateTaskState(teammateTask.id), teammateTask)
      },
    [],
  )
  const setTeammateTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(
          teammateTaskState(teammateTask.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [teammateTask.id, upsert],
  )

  return {
    teammateTask,
    setTeammateTask,
  }
}
