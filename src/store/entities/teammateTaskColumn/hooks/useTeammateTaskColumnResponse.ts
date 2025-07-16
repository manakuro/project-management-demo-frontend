import { useRecoilCallback } from 'recoil'
import { useTaskColumnsResponse } from 'src/store/entities/taskColumn'
import { teammateTaskColumnState } from '../atom'
import type { TeammateTaskColumnResponse } from '../type'

export const useTeammateTaskColumnResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse()

  const setTeammatesTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: TeammateTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(teammateTaskColumnState(p.id), p)
        })

        const taskColumns = data.map((d) => d.taskColumn)
        setTaskColumns(taskColumns)
      },
    [setTaskColumns],
  )

  return {
    setTeammatesTaskColumns,
  }
}
