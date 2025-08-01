import { Box } from '@/components/ui/atoms';
import { useProject } from '@/store/entities/project';
import type React from 'react';
import { memo } from 'react';

type Props = {
  projectId: string;
};

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId);

  return (
    <Box px={2} maxW={80} noOfLines={1} fontWeight="semibold">
      {project.name}
    </Box>
  );
});
TaskSectionName.displayName = 'TaskSectionName';
