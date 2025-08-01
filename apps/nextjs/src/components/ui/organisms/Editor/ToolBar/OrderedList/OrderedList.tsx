import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useOrderedList } from '@/shared/prosemirror/hooks';
import type React from 'react';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const OrderedList: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useOrderedList();

  return (
    <BaseButton
      aria-label="ordered list"
      icon={<Icon icon="listOl" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Ordered List\n(⌘+⇧+7)',
        'aria-label': 'Ordered List',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
OrderedList.displayName = 'OrderedList';
