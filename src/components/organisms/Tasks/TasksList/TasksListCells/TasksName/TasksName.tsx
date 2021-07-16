import React, { memo, useCallback } from 'react'
import { CheckIcon, FlexProps, Icon, Stack, Text } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { useRouter } from 'src/router'
import { useTask } from 'src/store/entities/tasks'
import { ExpandIcon } from './ExpandIcon'
import { Feed } from './Feed'
import { Like } from './Like'
import { Mark } from './Mark'
import { Subtask } from './Subtask'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameField } from './TasksNameField'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { TasksNameGrabIconContainer } from './TasksNameGrabIconContainer'
import { TasksNameProvider, useTasksNameContext } from './TasksNameProvider'
import { TasksNameRightContainer } from './TasksNameRightContainer'

type Props = FlexProps & {
  taskId: string
  width: string
  isSubtask?: boolean
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
  const { stickyStyle } = useTasksListContext()

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
    <>
      <TasksNameCell
        pl={props.isSubtask ? 12 : 6}
        onClick={handleClick}
        containerStyle={{
          w: props.width,
          minW: '400px',
          maxW: '800px',
          ...stickyStyle,
          bg: 'inherit',
        }}
        ref={ref}
      >
        <TasksNameGrabIconContainer>
          <TasksNameGrabIcon />
        </TasksNameGrabIconContainer>
        <ExpandIcon />
        <CheckIcon isDone={task.isDone} ml={1} onClick={handleToggleDone} />
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
    </>
  )
})
TasksName.displayName = 'TasksName'
