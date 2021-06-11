import React, { memo, useCallback, useMemo } from 'react'
import { Button, Flex, Icon, Text } from 'src/components/atoms'
import {
  MenuItemOption,
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms'
import { PopoverCompletedTasks } from 'src/components/organisms/Tasks/TasksHeader/IncompleteTasksButton/PopoverCompletedTasks'
import { useDisclosure } from 'src/shared/chakra'
import { TaskListStatuses, useMyTasksTaskStatus } from 'src/store/app/myTasks'

type Props = {}

export const IncompleteTasksButton: React.VFC<Props> = memo<Props>(() => {
  const { onSetTaskListStatus, isTaskListStatus } = useMyTasksTaskStatus()
  const popoverDisclosure = useDisclosure()

  const handleChange = useCallback(
    (status: TaskListStatuses) => {
      onSetTaskListStatus(status)
    },
    [onSetTaskListStatus],
  )

  const buttonText = useMemo<string>(() => {
    switch (true) {
      case isTaskListStatus('incomplete'):
        return 'Incomplete tasks'
      case isTaskListStatus('completed'):
      case isTaskListStatus('completedToday'):
      case isTaskListStatus('completedYesterday'):
      case isTaskListStatus('completed1Week'):
      case isTaskListStatus('completed2Weeks'):
      case isTaskListStatus('completed3Weeks'):
        return 'Completed tasks'
      case isTaskListStatus('all'):
        return 'All tasks'
      default:
        return ''
    }
  }, [isTaskListStatus])

  return (
    <MenuSelect<TaskListStatuses>
      onChange={handleChange}
      placement="bottom-end"
    >
      {({ listStatus, onChange, onClose }) => (
        <>
          <MenuSelectButton
            variant="ghost"
            aria-label="Task list status"
            as={Button}
            leftIcon={<Icon icon="checkCircle" />}
            size="xs"
          >
            {buttonText}
          </MenuSelectButton>
          <MenuSelectList>
            <MenuItemOption value="incomplete">
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
            <MenuItemOption value="all">
              <Flex onMouseEnter={popoverDisclosure.onClose}>All tasks</Flex>
            </MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  )
})
IncompleteTasksButton.displayName = 'IncompleteTasksButton'
