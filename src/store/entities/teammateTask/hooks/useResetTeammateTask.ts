import { useRecoilCallback } from 'recoil'
import { teammateTaskState } from '../atom'
import { TeammateTask } from '../type'

export const useResetTeammateTask = () => {
  const resetTeammateTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(teammateTaskState(id))
      },
    [],
  )

  const resetTeammateTasks = useRecoilCallback(
    ({ reset }) =>
      (teammateTasks: TeammateTask[]) => {
        teammateTasks.forEach((t) => {
          reset(teammateTaskState(t.id))
        })
      },
    [],
  )

  return {
    resetTeammateTask,
    resetTeammateTasks,
  }
}
