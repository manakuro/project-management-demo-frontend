import { useRecoilCallback } from 'recoil'
import { projectTaskColumnState } from '../atom'
import { ProjectTaskColumn } from '../type'
import { UseUpsert } from './useUpsert'

export const useProjectTaskColumnCommand = () => {
  const { upsert } = UseUpsert()

  const setProjectsTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTaskColumn> & { id: string }) => {
        const prev = await snapshot.getPromise(projectTaskColumnState(val.id))
        upsert({ ...prev, ...val })
      },
    [upsert],
  )

  const setProjectTaskColumnOrder = useRecoilCallback(
    () => (ids: string[]) => {
      ids.forEach((id, index) => {
        upsert({
          id,
          order: index,
        })
      })
    },
    [upsert],
  )

  return {
    upsert,
    setProjectsTaskColumn,
    setProjectTaskColumnOrder,
  }
}
