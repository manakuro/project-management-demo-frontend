import { useMe } from '@/store/entities/me';
import { useTeammatesTaskSectionCommand } from '@/store/entities/teammatesTaskSection';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe();
  const {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  } = useTeammatesTaskSectionCommand();

  const addTaskSection = useAtomCallback(
    useCallback(
      (_get, _set) => {
        return addTeammatesTaskSection({ teammateId: me.id });
      },
      [me.id, addTeammatesTaskSection],
    ),
  );

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  };
};
