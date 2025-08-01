import { TagChip } from '@/components/features/molecules/Chips';
import type { FlexProps } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules/Tooltip';
import { useTaskTag } from '@/store/entities/taskTag';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps & {
  taskTagId: string;
};

export const Tag: React.FC<Props> = memo<Props>((props) => {
  const { taskTagId } = props;
  const { taskTag } = useTaskTag(taskTagId);

  return (
    <Tooltip
      hasArrow
      label={taskTag.tag.name}
      aria-label={taskTag.tag.name}
      withIcon
      openDelay={500}
    >
      <TagChip taskTagId={taskTagId} variant="icon" />
    </Tooltip>
  );
});
Tag.displayName = 'Tag';
