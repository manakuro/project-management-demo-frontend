import { memo } from 'react';
import { Icon, IconButton, PortalManager } from 'src/components/ui/atoms';
import { Menu, MenuButton } from 'src/components/ui/organisms/Menu';
import { MenuList } from './MenuList';

export const MoreActionButton = memo(function MoreActionButton() {
  return (
    <PortalManager zIndex={1500}>
      <Menu placement="bottom-start" isLazy>
        <MenuButton
          aria-label="More actions"
          as={IconButton}
          icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
          variant="ghost"
          size="sm"
          h="28px"
        />
        <MenuList />
      </Menu>
    </PortalManager>
  );
});
