import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { TasksNameField } from './TasksNameField'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { Mark } from './Mark'
import { useTasksListDetail } from 'src/components/organisms'
import { TasksNameProvider, useTasksName } from './TasksNameProvider'

type Props = FlexProps

export const TasksName: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider>
      <Component {...props} />
    </TasksNameProvider>
  )
}

const Component: React.FC<Props> = memo<Props>(() => {
  const { ref, onMarkMenuOpened, onMarkMenuClosed, showMark } = useTasksName()
  const { setIsOpen } = useTasksListDetail()

  const handleTasksListDetailOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <TasksNameCell ref={ref} onClick={handleTasksListDetailOpen}>
      <TasksNameGrabIcon />
      <CheckIcon isDone={false} ml={4} />
      <TasksNameField
        value="Organize component folder"
        onChange={() => {}}
        focusedBorder
      />
      <Flex alignItems="center" ml="auto" display={showMark ? 'flex' : 'none'}>
        <Mark
          variant="unmarked"
          onOpened={onMarkMenuOpened}
          onClosed={onMarkMenuClosed}
        />
        <Text fontSize="xs" color="text.muted" ml={3}>
          Details
        </Text>
        <Icon icon="chevronRight" color="text.muted" mt="1px" />
      </Flex>
    </TasksNameCell>
  )
})
