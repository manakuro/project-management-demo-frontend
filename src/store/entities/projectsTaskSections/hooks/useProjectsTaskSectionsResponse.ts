import { useRecoilCallback } from 'recoil'
import { useTaskSectionsResponse } from 'src/store/entities/taskSections'
import { projectsTaskSectionState } from '../atom'
import { ProjectsTaskSectionResponse } from '../type'

export const useProjectsTaskSectionsResponse = () => {
  const { setTaskSections } = useTaskSectionsResponse()

  const setProjectsTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(projectsTaskSectionState(d.id), d)
          setTaskSections([d.taskSection])
        })
      },
    [setTaskSections],
  )

  return {
    setProjectsTaskSections,
  }
}
