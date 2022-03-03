import { useRecoilCallback } from 'recoil'
import { projectTaskColumnState } from '../atom'

export const useResetProjectTaskColumn = () => {
  const resetProjectTaskColumn = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectTaskColumnState(id))
      },
    [],
  )

  const resetProjectTaskColumns = useRecoilCallback(
    ({ reset }) =>
      (projectTaskColumns: string[]) => {
        projectTaskColumns.forEach((id) => {
          reset(projectTaskColumnState(id))
        })
      },
    [],
  )

  return {
    resetProjectTaskColumn,
    resetProjectTaskColumns,
  }
}
