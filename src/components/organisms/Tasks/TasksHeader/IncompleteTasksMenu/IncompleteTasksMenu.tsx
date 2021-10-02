import React, { memo, useCallback, useMemo } from 'react'
import { Button, Flex, Icon, Text } from 'src/components/atoms'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { useTasksTaskStatus } from 'src/components/organisms/Tasks/hooks'
import { useDisclosure } from 'src/shared/chakra'
import {
  TASK_LIST_COMPLETED_STATUS_TYPE_ALL,
  TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE,
  TaskListCompletedStatusType,
} from 'src/store/app/myTasks/taskListStatus'
import { PopoverCompletedTasks } from './PopoverCompletedTasks'

type Props = {}

export const IncompleteTasksMenu: React.VFC<Props> = memo<Props>(() => {
  const { onSetTaskListStatus, isTaskListStatus, taskListStatus } =
    useTasksTaskStatus()
  const popoverDisclosure = useDisclosure()

  const handleChange = useCallback(
    (status: ToString<TaskListCompletedStatusType>) => {
      onSetTaskListStatus(Number(status) as TaskListCompletedStatusType)
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
    <MenuSelect<ToString<TaskListCompletedStatusType>>
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
          <MenuSelectList defaultValue={taskListStatus.toString()}>
            <MenuItemOption
              value={TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE.toString()}
            >
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
            <MenuItemOption
              value={TASK_LIST_COMPLETED_STATUS_TYPE_ALL.toString()}
            >
              <Flex onMouseEnter={popoverDisclosure.onClose}>All tasks</Flex>
            </MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  )
})
IncompleteTasksMenu.displayName = 'IncompleteTasksButton'
