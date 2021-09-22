import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'
import {
  projectsTaskSectionSelector,
  defaultProjectsTaskSectionState,
} from '../atom'
import { ProjectsTaskSection } from '../type'

export const useProjectsTaskSectionsCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectsTaskSection) => {
        set(projectsTaskSectionSelector(val.id), val)
      },
    [],
  )

  const addProjectsTaskSection = useRecoilCallback(
    () => (val?: Partial<ProjectsTaskSection>) => {
      const id = uuid()
      const taskSectionId = addTaskSection()
      upsert({
        ...defaultProjectsTaskSectionState(),
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
