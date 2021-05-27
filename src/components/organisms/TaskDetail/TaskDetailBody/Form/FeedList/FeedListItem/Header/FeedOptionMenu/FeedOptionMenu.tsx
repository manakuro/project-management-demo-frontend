import React, { memo } from 'react'
import { Icon, IconButton, Portal } from 'src/components/atoms'
import { Menu, MenuList, MenuGroup, MenuButton } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { Pin } from './Pin'
import { EditComment } from './EditComment'
import { DeleteComment } from './DeleteComment'
import { CopyCommentLink } from './CopyCommentLink'
import { DeleteStory } from './DeleteStory'

type Props = {}

export const FeedOptionMenu: React.FC<Props> = memo(() => {
  const { showFeedOptionMenu } = useFeedListItem()
  if (!showFeedOptionMenu) return null

  return (
    <Menu isLazy lazyBehavior="keepMounted" placement="bottom-end">
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
            <EditComment />
            <DeleteComment />
            <DeleteStory />
            <CopyCommentLink />
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})
FeedOptionMenu.displayName = 'FeedOptionMenu'
