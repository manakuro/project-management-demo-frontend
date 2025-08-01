import { Icon, type IconProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { useSubtasksNameContext } from './Provider';

type Props = Omit<IconProps, 'icon'>;

export const TasksNameGrabIcon: React.FC<Props> = memo<Props>((props) => {
  const { showIcon } = useSubtasksNameContext();
  return (
    <Icon
      icon="gridVertical"
      color="text.muted"
      size="sm"
      visibility={showIcon ? 'visible' : 'hidden'}
      cursor="grab"
      {...props}
    />
  );
});
TasksNameGrabIcon.displayName = 'TasksNameGrabIcon';
