import { useTeammateTaskSection } from 'src/store/entities/teammatesTaskSection';

export const useMyTasksTaskSection = (taskSectionId: string) => {
  const { teammateTaskSection, setTeammateTaskSectionName } =
    useTeammateTaskSection(taskSectionId);

  return {
    taskSection: teammateTaskSection,
    setSectionName: setTeammateTaskSectionName,
  };
};
