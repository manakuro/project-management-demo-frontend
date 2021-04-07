import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon, Text } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import {
  ALL_TASKS,
  INCOMPLETE_TASKS,
  ListStatus,
} from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/listState'
import { PopoverCompletedTasks } from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/PopoverCompletedTasks'

type Props = {}

export const IncompleteTasksButton: React.VFC<Props> = memo<Props>((props) => {
  const popoverDisclosure = useDisclosure()

  const handleChange = useCallback((listStatus: ListStatus) => {
    console.log('hey: ', listStatus)
  }, [])

  return (
    <MenuSelect<ListStatus> onChange={handleChange} placement="bottom-end">
      {({ listStatus, onChange, onClose }) => (
        <>
          <MenuSelectButton
            variant="ghost"
            aria-label="Sort tasks"
            as={Button}
            leftIcon={<Icon icon="checkCircle" />}
            size="xs"
          >
            Incomplete tasks
          </MenuSelectButton>
          <MenuSelectList>
            <MenuItemOption value={INCOMPLETE_TASKS}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>
                Incomplete tasks
              </Flex>
            </MenuItemOption>
            <MenuItemOption>
              <Flex onMouseEnter={popoverDisclosure.onOpen}>
                <PopoverCompletedTasks
                  isOpen={popoverDisclosure.isOpen}
                  placement="left-start"
                  onClose={() => {
                    popoverDisclosure.onClose()
                    onClose()
                  }}
                  listStatus={listStatus}
                  onChange={onChange}
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
            <MenuItemOption value={ALL_TASKS}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>All tasks</Flex>
            </MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  )
})
