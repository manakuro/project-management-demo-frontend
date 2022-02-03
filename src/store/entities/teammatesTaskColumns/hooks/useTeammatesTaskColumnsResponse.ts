import { useRecoilCallback } from 'recoil'
import { useTaskColumnsResponse } from 'src/store/entities/taskColumns'
import { teammatesTaskColumnState } from '../atom'
import { TeammateTaskColumnResponse } from '../type'

export const useTeammatesTaskColumnsResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse()

  const setTeammatesTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: TeammateTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(teammatesTaskColumnState(p.id), p)
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
