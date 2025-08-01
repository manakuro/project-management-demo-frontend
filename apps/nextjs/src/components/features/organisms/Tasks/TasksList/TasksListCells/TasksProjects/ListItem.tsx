import { ProjectChip } from '@/components/features/molecules/Chips';
import { useProjectTask } from '@/store/entities/projectTask';
import type React from 'react';
import { memo } from 'react';

type Props = {
  projectTaskId: string;
};

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { projectTask } = useProjectTask(props.projectTaskId);

  return <ProjectChip variant="button" projectId={projectTask.projectId} />;
});
ListItem.displayName = 'ListItem';
