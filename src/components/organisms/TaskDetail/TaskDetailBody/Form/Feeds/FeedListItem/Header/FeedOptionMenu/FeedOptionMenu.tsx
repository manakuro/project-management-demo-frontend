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
import { Pin } from './Pin'

type Props = {}

export const FeedOptionMenu: React.FC<Props> = memo(() => {
  const { onEdit, showFeedOptionMenu, onCopyCommentLink } = useFeedListItem()
  if (!showFeedOptionMenu) return null

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
            <Pin />
            <MenuItem onClick={onEdit}>Edit comment</MenuItem>
            <MenuItem color="alert">Delete comment</MenuItem>
            <MenuItem onClick={onCopyCommentLink}>Copy comment link</MenuItem>
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})
FeedOptionMenu.displayName = 'FeedOptionMenu'
