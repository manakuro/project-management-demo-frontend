import React, { memo, useCallback } from 'react'
import { CheckIcon, FlexProps, Icon, Text } from 'src/components/atoms'
import { useRouter } from 'src/router'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { useTask } from 'src/store/entities/tasks'
import { Mark } from './Mark'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameField } from './TasksNameField'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { TasksNameProvider, useTasksName } from './TasksNameProvider'
import { TasksNameRightContainer } from './TasksNameRightContainer'

type Props = FlexProps & {
  taskId: string
  taskColumnId: string
}

export const TasksName: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider>
      <Component {...props} />
    </TasksNameProvider>
  )
}

const Component: React.VFC<Props> = memo<Props>((props) => {
  const { ref, onMarkMenuOpened, onMarkMenuClosed } = useTasksName()
  const { navigateToTaskDetail } = useRouter()
  const { task, setTask } = useTask(props.taskId)
  const { taskColumn } = useTaskColumn(props.taskColumnId)

  const handleClick = useCallback(async () => {
    await navigateToTaskDetail(task.id)
  }, [navigateToTaskDetail, task.id])

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTask({ name: val })
    },
    [setTask],
  )

  return (
    <TasksNameCell ref={ref} onClick={handleClick} w={taskColumn.width}>
      <TasksNameGrabIcon />
      <CheckIcon isDone={task.isDone} ml={4} />
      <TasksNameField
        value={task.name}
        onChange={handleChangeName}
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
