import { useTeammateTaskSections } from 'src/store/entities/teammatesTaskSections'

export const useMyTasksTaskSections = () => {
  const { teammateTaskSections } = useTeammateTaskSections()

  return {
    taskSections: teammateTaskSections,
  }
}
