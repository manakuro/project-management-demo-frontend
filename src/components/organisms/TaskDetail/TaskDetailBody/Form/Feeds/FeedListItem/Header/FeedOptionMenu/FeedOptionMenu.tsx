import React, { memo } from 'react'
import { Icon, IconButton, Portal } from 'src/components/atoms'
import {
  Menu,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuButton,
} from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Feeds/FeedListItem/Provider'

type Props = {}

export const FeedOptionMenu: React.FC<Props> = memo(() => {
  const { onEdit } = useFeedListItem()

  return (
    <Menu isLazy placement="bottom-end">
      <MenuButton
        aria-label="Feed option menu"
        as={IconButton}
        icon={<Icon icon="chevronDown" color="text.muted" />}
        size="sm"
        variant="ghost"
      />
      <Portal>
        <MenuList>
          <MenuGroup>
            <MenuItem>Pin to top</MenuItem>
            <MenuItem onClick={onEdit}>Edit comment</MenuItem>
            <MenuItem color="alert">Delete comment</MenuItem>
            <MenuItem>Copy comment link</MenuItem>
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})
FeedOptionMenu.displayName = 'FeedOptionMenu'
