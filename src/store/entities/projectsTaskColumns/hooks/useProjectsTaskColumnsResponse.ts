import { useRecoilCallback } from 'recoil'
import { useTaskColumnsResponse } from 'src/store/entities/taskColumns'
import { projectsTaskColumnState } from '../atom'
import { ProjectsTaskColumnResponse } from '../type'

export const useProjectsTaskColumnsResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse()

  const setProjectsTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(projectsTaskColumnState(p.id), p)

          setTaskColumns([p.taskColumn])
        })
      },
    [setTaskColumns],
  )

  return {
    setProjectsTaskColumns,
  }
}
