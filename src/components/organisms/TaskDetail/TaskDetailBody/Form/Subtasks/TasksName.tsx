import React, { memo, useMemo } from 'react'
import { CheckIcon, FlexProps } from 'src/components/atoms'
import { useHover } from 'src/hooks/useHover'
import { useMarkMenuFocus } from './useMarkMenuFocus'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import {
  TasksNameCell,
  TasksNameGrabIcon,
  TasksNameField,
  useTasksName,
  TasksNameProvider,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName'

type Props = FlexProps

export const TasksName: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider>
      <Component {...props} />
    </TasksNameProvider>
  )
}

export const Component: React.FC<Props> = memo<Props>(() => {
  const { ref, isHovering } = useHover()
  const { inputFocused } = useTasksName()
  const { markMenuFocused } = useMarkMenuFocus()
  const showIcon = useMemo(() => isHovering || markMenuFocused, [
    isHovering,
    markMenuFocused,
  ])
  const showMark = useMemo(
    () => (isHovering || markMenuFocused) && !inputFocused,
    [isHovering, markMenuFocused, inputFocused],
  )
  console.log(showMark)

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none">
        <TasksNameGrabIcon show={showIcon} />
        <CheckIcon isDone={false} ml={2} />
        <TasksNameField value="Organize component folder" onChange={() => {}} />
      </TasksNameCell>
    </TasksListRow>
  )
})
