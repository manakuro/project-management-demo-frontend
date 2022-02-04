import { useRecoilCallback } from 'recoil'
import { useTaskColumnsResponse } from 'src/store/entities/taskColumns'
import { projectsTaskColumnState } from '../atom'
import { ProjectTaskColumnResponse } from '../type'

export const useProjectsTaskColumnResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse()

  const setProjectsTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(projectsTaskColumnState(p.id), p)
        })
        const taskColumns = data.map((d) => d.taskColumn)
        setTaskColumns(taskColumns)
      },
    [setTaskColumns],
  )

  return {
    setProjectsTaskColumns,
  }
}
