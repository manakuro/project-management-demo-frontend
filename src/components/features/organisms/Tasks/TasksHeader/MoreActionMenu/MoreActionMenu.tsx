import { memo } from 'react'
import { Box, Icon, IconButton, PortalManager } from 'src/components/ui/atoms'
import { Menu, MenuButton } from 'src/components/ui/organisms/Menu'
import { MenuList } from './MenuList'

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
  )
})
