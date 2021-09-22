import { useRecoilCallback } from 'recoil'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'

export const useProjectsTaskSectionCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const addProjectsSection = useRecoilCallback(
    () => () => {
      return addTaskSection()
    },
    [addTaskSection],
  )

  return {
    addTaskSection: addProjectsSection,
  }
}
