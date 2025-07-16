import { useRecoilCallback } from 'recoil';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { useProjectTaskCommand } from 'src/store/entities/projectTask';

export const useProjectsTask = () => {
  const { addProjectTask, setProjectTaskByTaskId } = useProjectTaskCommand();
  const { projectId } = useProjectsProjectId();

  const addTask = useRecoilCallback(
    () => (input: { taskSectionId: string }) => {
      return addProjectTask({
        projectId,
        projectTaskSectionId: input.taskSectionId,
      });
    },
    [addProjectTask, projectId],
  );

  const setTaskSectionId = useRecoilCallback(
    () => async (input: { taskSectionId: string; taskId: string }) => {
      await setProjectTaskByTaskId(
        { taskId: input.taskId, projectId },
        {
          projectTaskSectionId: input.taskSectionId,
        },
      );
    },
    [projectId, setProjectTaskByTaskId],
  );

  return {
    addTask,
    setTaskSectionId,
  };
};
