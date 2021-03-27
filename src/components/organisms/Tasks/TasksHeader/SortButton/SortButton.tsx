import React, { memo, useCallback, useState } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { NONE, ListStatus } from './listState'
import { MenuList } from './MenuList'

type Props = {}

export const SortButton: React.VFC<Props> = memo<Props>((props) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [listState, setListState] = useState<ListStatus>(NONE)

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleChangeSort = useCallback(
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
      {isOpen && (
        <MenuList
          listStatus={listState}
          onCloseMenu={onClose}
          onChange={handleChangeSort}
        />
      )}
    </Menu>
  )
})
