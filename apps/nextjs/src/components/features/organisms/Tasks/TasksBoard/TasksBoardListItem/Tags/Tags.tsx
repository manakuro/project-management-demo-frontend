import type React from 'react';
import { memo } from 'react';
import { type FlexProps, Stack } from 'src/components/ui/atoms';
import { useTaskTagIdsByTaskId } from 'src/store/entities/taskTag';
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
