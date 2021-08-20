import React, { memo } from 'react'
import { Box, Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { MenuList } from './MenuList'

type Props = {}

export const MoreAction: React.FC<Props> = memo<Props>(() => {
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
MoreAction.displayName = 'MoreAction'
