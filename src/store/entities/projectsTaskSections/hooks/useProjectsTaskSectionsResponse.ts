import { useRecoilCallback } from 'recoil'
import { useTaskSectionsResponse } from 'src/store/entities/taskSections'
import { projectsTaskSectionSelector } from '../atom'
import { ProjectsTaskSectionResponse } from '../type'

export const useProjectsTaskSectionsResponse = () => {
  const { setTaskSections } = useTaskSectionsResponse()

  const setProjectsTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(projectsTaskSectionSelector(d.id), d)
          setTaskSections([d.taskSection])
        })
      },
    [setTaskSections],
  )

  return {
    setProjectsTaskSections,
  }
}
