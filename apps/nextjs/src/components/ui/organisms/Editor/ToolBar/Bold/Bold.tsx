import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useBold } from '@/shared/prosemirror/hooks';
import type React from 'react';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Bold: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useBold();

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="bold" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
Bold.displayName = 'Bold';
