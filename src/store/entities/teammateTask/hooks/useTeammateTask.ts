import { useRecoilCallback, useRecoilValue } from 'recoil'
import { teammateTaskState } from '../atom'
import type { TeammateTask } from '../type'

export const useTeammateTask = (teammateTaskId: string) => {
  const teammateTask = useRecoilValue(teammateTaskState(teammateTaskId))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (teammateTask: TeammateTask) => {
        set(teammateTaskState(teammateTask.id), teammateTask)
      },
    [],
  )
  const setTeammateTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(
          teammateTaskState(teammateTask.id),
        )
        upsert({
          ...prev,
          ...input,
        })
      },
    [teammateTask.id, upsert],
  )

  return {
    teammateTask,
    setTeammateTask,
  }
}
