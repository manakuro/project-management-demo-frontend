import React, { memo, useCallback, useState } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'
import {
  INCOMPLETE_TASKS,
  ListStatus,
} from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/listState'

type Props = {}

export const IncompleteTasksButton: React.VFC<Props> = memo<Props>((props) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [listStatus, setListStatus] = useState<ListStatus>(INCOMPLETE_TASKS)

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  return (
    <Menu
      closeOnBlur={false}
      closeOnSelect={false}
      isOpen={isOpen}
      isLazy
      placement="bottom-end"
    >
      <MenuButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="checkCircle" />}
        size="xs"
        onClick={handleOpen}
      >
        Incomplete tasks
      </MenuButton>
      {isOpen && (
        <MenuList
          onCloseMenu={onClose}
          listStatus={listStatus}
          onChangeListStatus={setListStatus}
        />
      )}
    </Menu>
  )
})
