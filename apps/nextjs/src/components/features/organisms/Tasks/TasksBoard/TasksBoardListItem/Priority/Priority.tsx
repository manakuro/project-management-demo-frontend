import { PriorityChip } from '@/components/features/molecules/Chips';
import type { FlexProps } from '@/components/ui/atoms';
import { useTask } from '@/store/entities/task';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  taskId: string;
};

export const Priority: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props;
  const { task } = useTask(taskId);

  return (
    <PriorityChip taskPriorityId={task.taskPriorityId} disableStopPropagation />
  );
});
Priority.displayName = 'Priority';
