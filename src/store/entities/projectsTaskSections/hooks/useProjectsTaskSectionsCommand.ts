import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'
import {
  projectsTaskSectionState,
  initialProjectsTaskSectionState,
} from '../atom'
import { ProjectsTaskSection } from '../type'

export const useProjectsTaskSectionsCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectsTaskSection) => {
        set(projectsTaskSectionState(val.id), val)
      },
    [],
  )

  const addProjectsTaskSection = useRecoilCallback(
    () => (val?: Partial<ProjectsTaskSection>) => {
      const id = uuid()
      const taskSectionId = addTaskSection()
      upsert({
        ...initialProjectsTaskSectionState(),
        ...val,
        taskSectionId,
        id,
      })

      return taskSectionId
    },
    [upsert, addTaskSection],
  )

  return {
    addProjectsTaskSection,
  }
}
