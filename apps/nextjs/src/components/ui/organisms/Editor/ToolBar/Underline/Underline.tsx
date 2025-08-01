import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useUnderline } from '@/shared/prosemirror/hooks';
import type React from 'react';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Underline: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useUnderline();
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
Underline.displayName = 'Underline';
