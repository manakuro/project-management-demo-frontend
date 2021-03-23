import React, { memo, useCallback } from 'react'
import { Icon, IconButton, Portal } from 'src/components/atoms'
import {
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Menu,
} from 'src/components/organisms'
import { ListStatus, VIEW_AS_TILES, VIEW_AS_LIST } from './ProjectsContainer'

type Props = {
  listStatus: ListStatus
  onChange: (listStatus: ListStatus) => void
}

export const ListIcon: React.VFC<Props> = memo<Props>((props) => {
  const handleClickViewAsTitles = useCallback(() => {
    props.onChange(VIEW_AS_TILES)
  }, [props])

  const handleClickViewAsList = useCallback(() => {
    props.onChange(VIEW_AS_LIST)
  }, [props])

  return (
    <Menu placement="bottom-start" isLazy>
      <MenuButton
        as={IconButton}
        aria-label="list icon"
        icon={<Icon icon="table" color="text.muted" size="sm" />}
        variant="ghost"
      />
      <Portal>
        <MenuList>
          <MenuOptionGroup value={props.listStatus} type="radio">
            <MenuItemOption
              onClick={handleClickViewAsTitles}
              value={VIEW_AS_TILES}
            >
              View as tiles
            </MenuItemOption>
            <MenuItemOption
              onClick={handleClickViewAsList}
              value={VIEW_AS_LIST}
            >
              View as list
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})
