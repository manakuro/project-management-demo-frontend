import React, { memo, useCallback } from 'react'
import { CheckIcon, FlexProps, Icon, Stack, Text } from 'src/components/atoms'
import { useRouter } from 'src/router'
import { useTask } from 'src/store/entities/tasks'
import { Feed } from './Feed'
import { Like } from './Like'
import { Mark } from './Mark'
import { Subtask } from './Subtask'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameField } from './TasksNameField'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { TasksNameProvider, useTasksNameContext } from './TasksNameProvider'
import { TasksNameRightContainer } from './TasksNameRightContainer'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  return (
    <TasksNameProvider taskId={props.taskId}>
      <Component {...props} />
    </TasksNameProvider>
  )
})

const Component: React.VFC<Props> = memo<Props>((props) => {
  const { ref, onMarkMenuOpened, onMarkMenuClosed } = useTasksNameContext()
  const { navigateToTaskDetail } = useRouter()
  const { task, setTask, deleteTask, setTaskName } = useTask(props.taskId)

  const handleClick = useCallback(async () => {
    await navigateToTaskDetail(task.id)
  }, [navigateToTaskDetail, task.id])

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )
  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await setTask({ isDone: !task.isDone })
    },
    [setTask, task.isDone],
  )

  return (
    <TasksNameCell ref={ref} onClick={handleClick} w={props.width} minW="400px">
      <TasksNameGrabIcon />
      <CheckIcon isDone={task.isDone} ml={4} onClick={handleToggleDone} />
      <TasksNameField
        value={task.name}
        isNew={task.isNew}
        onChange={handleChangeName}
        deleteTask={deleteTask}
        focusedBorder
        flex={1}
      />
      <Stack direction="row" spacing={1} ml={1} mr="auto">
        <Like />
        <Feed />
        <Subtask />
      </Stack>
      <TasksNameRightContainer>
        <Mark
          variant="unmarked"
          onOpened={onMarkMenuOpened}
          onClosed={onMarkMenuClosed}
        />
        <Text fontSize="xs" color="text.muted" ml={2}>
          Details
        </Text>
        <Icon icon="chevronRight" color="text.muted" mt="1px" />
      </TasksNameRightContainer>
    </TasksNameCell>
  )
})
TasksName.displayName = 'TasksName'
