import type React from 'react';
import { memo, useCallback } from 'react';
import { Icon } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useTaskCommand } from 'src/store/entities/task';

type Props = {
  taskId: string;
  isHovering: boolean;
};

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { isHovering, taskId } = props;
  const { unassignTask } = useTaskCommand();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await unassignTask({ id: taskId });
    },
    [taskId, unassignTask],
  );

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  );
});
DeleteButton.displayName = 'DeleteButton';
