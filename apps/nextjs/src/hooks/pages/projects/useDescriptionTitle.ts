import { useProject, useProjectCommand } from '@/store/entities/project';
import { useCallback } from 'react';

type Props = {
  projectId: string;
};

export const useDescriptionTitle = (props: Props) => {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { setProject } = useProjectCommand();

  const onChange = useCallback(
    async (val: string) => {
      if (val === project.descriptionTitle) return;

      await setProject({ descriptionTitle: val, projectId });
    },
    [project.descriptionTitle, setProject, projectId],
  );

  return {
    onChange,
    descriptionTitle: project.descriptionTitle,
  };
};
