import type React from 'react';
import { memo } from 'react';
import { Icon, type IconButtonProps } from 'src/components/ui/atoms';
import type { TooltipProps } from 'src/components/ui/molecules';
import { useLink } from 'src/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Link: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive, isEnable } = useLink();

  return (
    <BaseButton
      aria-label="link"
      icon={<Icon icon="link" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Link\n(⌘+b)',
        'aria-label': 'Link',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
Link.displayName = 'Link';
