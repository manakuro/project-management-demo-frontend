import { Box, Icon, IconButton, PortalManager } from '@/components/ui/atoms';
import { Menu, MenuButton } from '@/components/ui/organisms/Menu';
import { memo } from 'react';
import { MenuList } from './MenuList';

export const MoreActionMenu = memo(function MoreActionMenu() {
  return (
    <PortalManager zIndex={1500}>
      <Box>
        <Menu placement="bottom-start" isLazy>
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
            variant="ghost"
            size="sm"
          />
          <MenuList />
        </Menu>
      </Box>
    </PortalManager>
  );
});
