import React, { memo, useCallback } from 'react'
import { CheckIcon, FlexProps, Icon, Text } from 'src/components/atoms'
import { TasksNameField } from './TasksNameField'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { TasksNameRightContainer } from './TasksNameRightContainer'
import { Mark } from './Mark'
import { TasksNameProvider, useTasksName } from './TasksNameProvider'
import { useRouter } from 'src/router'

type Props = FlexProps

export const TasksName: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider>
      <Component {...props} />
    </TasksNameProvider>
  )
}

const Component: React.VFC<Props> = memo<Props>(() => {
  const { ref, onMarkMenuOpened, onMarkMenuClosed } = useTasksName()
  const { navigateToTaskDetail } = useRouter()

  const handleClick = useCallback(async () => {
    await navigateToTaskDetail('1')
  }, [navigateToTaskDetail])

  return (
    <TasksNameCell ref={ref} onClick={handleClick}>
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
