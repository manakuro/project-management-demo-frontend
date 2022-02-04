import { useRecoilCallback } from 'recoil'
import { projectsTaskColumnState } from '../atom'
import { ProjectTaskColumn } from '../type'

export const useProjectsTaskColumnCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: ProjectTaskColumn) => {
        set(projectsTaskColumnState(taskColumn.id), taskColumn)
      },
    [],
  )

  const setProjectsTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTaskColumn> & { id: string }) => {
        const current = await snapshot.getPromise(
          projectsTaskColumnState(val.id),
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
