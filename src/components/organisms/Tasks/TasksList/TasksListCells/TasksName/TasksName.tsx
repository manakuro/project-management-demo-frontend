import React, { memo, useCallback } from 'react'
import { CheckIcon, FlexProps, Icon, Text } from 'src/components/atoms'
import { TasksNameField } from './TasksNameField'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { TasksNameRightContainer } from './TasksNameRightContainer'
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
  const { ref, onMarkMenuOpened, onMarkMenuClosed } = useTasksName()
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
      <TasksNameRightContainer>
        <Mark
          variant="unmarked"
          onOpened={onMarkMenuOpened}
          onClosed={onMarkMenuClosed}
        />
        <Text fontSize="xs" color="text.muted" ml={3}>
          Details
        </Text>
        <Icon icon="chevronRight" color="text.muted" mt="1px" />
      </TasksNameRightContainer>
    </TasksNameCell>
  )
})
