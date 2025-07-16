import type React from 'react';
import { memo, useCallback } from 'react';
import { useSubtaskListContext } from 'src/components/features/organisms/Tasks/TasksList/TasksListItem/Provider';
import { Icon, IconButton } from 'src/components/ui/atoms';

type Props = {
  showExpandIcon: boolean;
};
export const Component: React.FC<Props> = memo<Props>((props) => {
  const { isSubtaskExpanded, onToggleExpandSubtask } = useSubtaskListContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onToggleExpandSubtask();
    },
    [onToggleExpandSubtask],
  );

  return (
    <IconButton
      onClick={handleClick}
      aria-label="Show sub task"
      icon={
        <Icon
          icon={isSubtaskExpanded ? 'chevronDown' : 'chevronRight'}
          color="text.muted"
          size="sm"
        />
      }
      visibility={props.showExpandIcon ? 'visible' : 'hidden'}
      size="xs"
      h={5}
      minW={5}
      p={0}
      variant="ghost"
    />
  );
});
Component.displayName = 'Component';
