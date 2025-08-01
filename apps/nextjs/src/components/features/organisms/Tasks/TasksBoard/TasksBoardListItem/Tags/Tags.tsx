import { type FlexProps, Stack } from '@/components/ui/atoms';
import { useTaskTagIdsByTaskId } from '@/store/entities/taskTag';
import type React from 'react';
import { memo } from 'react';
import { Tag } from './Tag';

type Props = FlexProps & {
  taskId: string;
};

export const Tags: React.FC<Props> = memo<Props>((props) => {
  const { taskTagIds } = useTaskTagIdsByTaskId(props.taskId);

  return (
    <Stack direction="row" spacing={1} overflow="hidden">
      {taskTagIds.map((id) => (
        <Tag taskTagId={id} key={id} />
      ))}
    </Stack>
  );
});
Tags.displayName = 'Tags';
