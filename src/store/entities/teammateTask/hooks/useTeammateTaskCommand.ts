import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { useTaskCommand } from 'src/store/entities/task'
import { teammateTaskState, initialState } from '../atom'
import { TeammateTask } from '../type'

export const useTeammateTaskCommand = () => {
  const { me } = useMe()
  const { addTask } = useTaskCommand()
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTask) => {
        set(teammateTaskState(val.id), val)
      },
    [],
  )

  const setTeammateTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(teammateTaskState(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  const addTeammateTask = useCallback(
    (val: Partial<TeammateTask> & { teammateTaskSectionId: string }) => {
      const id = uuid()
      const newTaskId = addTask({
        assigneeId: me.id,
        taskSectionId: val.teammateTaskSectionId,
      })
      const newTeammateTask = {
        ...initialState(),
        ...val,
        id,
        taskId: newTaskId,
        teammateId: me.id,
      }
      upsert(newTeammateTask)

      return id
    },
    [addTask, me.id, upsert],
  )

  return {
    addTeammateTask,
    setTeammateTaskById,
  }
}
