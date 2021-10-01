import { useRecoilCallback } from 'recoil'
import { useTaskColumnsResponse } from 'src/store/entities/taskColumns'
import { teammatesTaskColumnState } from '../atom'
import { TeammatesTaskColumnResponse } from '../type'

export const useTeammatesTaskColumnsResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse()

  const setTeammatesTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: TeammatesTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(teammatesTaskColumnState(p.id), p)

          setTaskColumns([p.taskColumn])
        })
      },
    [setTaskColumns],
  )

  return {
    setTeammatesTaskColumns,
  }
}
