import React, { memo, useCallback, useState } from 'react'
import { Button, Icon, Portal } from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { NONE, DUE_DATE, PROJECT, LIKES, ListStatus } from './listState'

type Props = {}

export const SortButton: React.VFC<Props> = memo<Props>((props) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [listState, setListState] = useState<ListStatus>(NONE)

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleSort = useCallback(
    (status: ListStatus) => {
      setListState(status)
      onClose()
    },
    [onClose],
  )

  return (
    <Menu isOpen={isOpen} isLazy placement="bottom-end">
      <MenuButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="sort" />}
        size="xs"
        onClick={handleOpen}
      >
        Sort
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuOptionGroup defaultValue={listState} type="radio">
            <MenuItemOption value={NONE} onClick={() => handleSort(NONE)}>
              None
            </MenuItemOption>
            <MenuItemOption value={PROJECT} onClick={() => handleSort(PROJECT)}>
              Project
            </MenuItemOption>
            <MenuItemOption
              value={DUE_DATE}
              onClick={() => handleSort(DUE_DATE)}
            >
              Due date
            </MenuItemOption>
            <MenuItemOption value={LIKES} onClick={() => handleSort(LIKES)}>
              Likes
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})
