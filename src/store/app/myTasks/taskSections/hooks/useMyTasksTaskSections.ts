import { useTeammateTaskSections } from 'src/store/entities/teammatesTaskSection'

export const useMyTasksTaskSections = () => {
  const { teammateTaskSections } = useTeammateTaskSections()

  return {
    taskSections: teammateTaskSections,
  }
}
