import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  TeammateTaskResponse,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSectionResponse } from '../type'

export const useTeammatesTaskSectionResponse = () => {
  const { setTeammateTask } = useTeammateTaskResponse()

  const setTeammatesTaskSections = useRecoilCallback(
    ({ set }) =>
      (
        data: TeammateTaskSectionResponse[],
        options?: { includeTeammateTask?: boolean; includeTask?: boolean },
      ) => {
        const includeTeammateTask = options?.includeTeammateTask ?? true
        const includeTask = options?.includeTask ?? true

        data.forEach((d) => {
          set(teammatesTaskSectionState(d.id), (prev) => {
            return {
              ...prev,
              ...d,
            }
          })
        })
        if (!includeTeammateTask) return

        const teammateTasks = data.reduce<TeammateTaskResponse[]>((acc, p) => {
          return uniqBy([...acc, ...p.teammateTasks], 'id')
        }, [])

        setTeammateTask(teammateTasks, { includeTask })
      },
    [setTeammateTask],
  )

  return {
    setTeammatesTaskSections,
  }
}
