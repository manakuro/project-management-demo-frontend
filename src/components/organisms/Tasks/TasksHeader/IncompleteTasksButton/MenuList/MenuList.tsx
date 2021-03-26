import React, { useCallback, useEffect } from 'react'
import { Flex, Icon, Portal, Text } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { PopoverCompletedTasks } from './PopoverCompletedTasks'
import {
  ALL_TASKS,
  INCOMPLETE_TASKS,
  ListStatus,
} from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/listState'

type Props = {
  onCloseMenu: () => void
  listStatus: ListStatus
  onChangeListStatus: (listStatus: ListStatus) => void
}

export const MenuList: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref, hasClickedOutside } = useClickOutside()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleCloseAll = useCallback(() => {
    onClose()
    props.onCloseMenu()
  }, [onClose, props])

  useEffect(() => {
    if (hasClickedOutside) {
      handleCloseAll()
    }
  }, [hasClickedOutside, handleCloseAll])

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <MenuOptionGroup value={props.listStatus} type="radio">
          <MenuItemOption
            value={INCOMPLETE_TASKS}
            onClick={() => props.onChangeListStatus(INCOMPLETE_TASKS)}
          >
            <Flex onMouseEnter={handleClose}>Incomplete tasks</Flex>
          </MenuItemOption>
          <MenuItemOption>
            <Flex onMouseEnter={handleOpen}>
              <PopoverCompletedTasks
                isOpen={isOpen}
                placement="left-start"
                onClose={handleCloseAll}
                listStatus={props.listStatus}
                onChangeListStatus={props.onChangeListStatus}
              >
                <Flex flex={1}>
                  <Text fontSize="sm" flex={1}>
                    Completed tasks
                  </Text>
                  <Icon icon="chevronRight" />
                </Flex>
              </PopoverCompletedTasks>
            </Flex>
          </MenuItemOption>
          <MenuItemOption
            value={ALL_TASKS}
            onClick={() => props.onChangeListStatus(ALL_TASKS)}
          >
            <Flex onMouseEnter={handleClose}>All tasks</Flex>
          </MenuItemOption>
        </MenuOptionGroup>
      </AtomsMenuList>
    </Portal>
  )
}
