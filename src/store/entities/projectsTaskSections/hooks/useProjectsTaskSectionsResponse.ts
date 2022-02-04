import { useRecoilCallback } from 'recoil'
import { ProjectTaskResponse } from 'src/graphql/types/projectTask'
import { uniqBy } from 'src/shared/utils'
import { useProjectTasksResponse } from 'src/store/entities/projectsTasks'
import { projectsTaskSectionState } from '../atom'
import { ProjectTaskSectionResponse } from '../type'

export const useProjectsTaskSectionsResponse = () => {
  const { setProjectTask } = useProjectTasksResponse()

  const setProjectsTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(projectsTaskSectionState(d.id), d)
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
