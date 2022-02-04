import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  TeammateTaskResponse,
  useTeammateTasksResponse,
} from 'src/store/entities/teammateTasks'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSectionResponse } from '../type'

export const useTeammatesTaskSectionsResponse = () => {
  const { setTeammateTask } = useTeammateTasksResponse()

  const setTeammatesTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: TeammateTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(teammatesTaskSectionState(d.id), d)
        })

        const teammateTasks = data.reduce<TeammateTaskResponse[]>((acc, p) => {
          return uniqBy([...acc, ...p.teammateTasks], 'id')
        }, [])
        setTeammateTask(teammateTasks)
      },
    [setTeammateTask],
  )

  return {
    setTeammatesTaskSections,
  }
}
