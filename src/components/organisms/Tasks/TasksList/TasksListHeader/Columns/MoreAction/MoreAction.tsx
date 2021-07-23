import React, { memo } from 'react'
import { Box, Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms'
import { MenuList } from './MenuList'

type Props = {
  onClosed?: () => void
  onOpened?: () => void
  onSort?: () => void
  onMoveRight?: () => void
  onMoveLeft?: () => void
  onHideColumn?: () => void
}

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
  return (
    <PortalManager zIndex={1500}>
      <Box>
        <Menu
          placement="bottom-start"
          isLazy
          onOpen={props.onOpened}
          onClose={props.onClosed}
        >
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="chevronDown" color="text.muted" />}
            variant="ghost"
            size="sm"
          />
          <MenuList
            onSort={props.onSort}
            onMoveRight={props.onMoveRight}
            onMoveLeft={props.onMoveLeft}
            onHideColumn={props.onHideColumn}
          />
        </Menu>
      </Box>
    </PortalManager>
  )
})
MoreAction.displayName = 'MoreAction'
