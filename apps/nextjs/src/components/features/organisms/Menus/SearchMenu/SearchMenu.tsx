import { PortalManager } from '@/components/ui/atoms';
import { Popover, type PopoverProps } from '@/components/ui/organisms/Popover';
import type React from 'react';
import { memo } from 'react';

type Props = PopoverProps;

export const SearchMenu: React.FC<Props> = memo<Props>((props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...props}
      />
    </PortalManager>
  );
});
SearchMenu.displayName = 'SearchMenu';
