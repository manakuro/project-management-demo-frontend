import { useRecoilCallback } from 'recoil'
import { projectTaskColumnState } from '../atom'
import { ProjectTaskColumn } from '../type'

export const useProjectTaskColumnCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: ProjectTaskColumn) => {
        set(projectTaskColumnState(taskColumn.id), taskColumn)
      },
    [],
  )

  const setProjectsTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTaskColumn> & { id: string }) => {
        const current = await snapshot.getPromise(
          projectTaskColumnState(val.id),
        )
        upsert({ ...current, ...val })
      },
    [upsert],
  )

  return {
    upsert,
    setProjectsTaskColumn,
  }
}
