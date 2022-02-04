import { useRecoilCallback } from 'recoil'
import { ProjectTaskResponse } from 'src/graphql/types/projectTask'
import { uniqBy } from 'src/shared/utils'
import { useProjectTaskResponse } from 'src/store/entities/projectTask'
import { projectTaskSectionState } from '../atom'
import { ProjectTaskSectionResponse } from '../type'

export const useProjectTaskSectionResponse = () => {
  const { setProjectTask } = useProjectTaskResponse()

  const setProjectsTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(projectTaskSectionState(d.id), d)
        })

        const projectTasks = data.reduce<ProjectTaskResponse[]>((acc, p) => {
          return uniqBy([...acc, ...p.projectTasks], 'id')
        }, [])
        setProjectTask(projectTasks)
      },
    [setProjectTask],
  )

  return {
    setProjectsTaskSections,
  }
}
