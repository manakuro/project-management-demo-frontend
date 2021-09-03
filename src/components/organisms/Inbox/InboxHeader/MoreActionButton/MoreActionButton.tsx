import React, { memo } from 'react'
import { Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { MenuList } from './MenuList'

type Props = {}

export const MoreActionButton: React.FC<Props> = memo<Props>(() => {
  return (
    <PortalManager zIndex={1500}>
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
    </PortalManager>
  )
})
MoreActionButton.displayName = 'MoreActionButton'
