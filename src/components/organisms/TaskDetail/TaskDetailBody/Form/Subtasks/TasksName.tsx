import React, { memo, useMemo } from 'react'
import { CheckIcon, FlexProps, Icon } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useHover } from 'src/hooks/useHover'
import { TasksNameField } from './TasksNameField'
import { useInputFocus } from './useInputFocus'
import { useMarkMenuFocus } from './useMarkMenuFocus'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'

type Props = FlexProps

export const TasksName: React.FC<Props> = memo<Props>(() => {
  const { ref, isHovering } = useHover()
  const { cellStyle, inputFocused, onInputBlur, onInputFocus } = useInputFocus()
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
      <TasksListCell
        fontSize="sm"
        ref={ref}
        flex={1}
        cursor="pointer"
        borderRight="none"
        {...cellStyle}
      >
        <Icon
          icon="gridVertical"
          color="text.muted"
          size="sm"
          visibility={showIcon ? 'visible' : 'hidden'}
          cursor="grab"
        />
        <CheckIcon isDone={false} ml={4} />
        <TasksNameField
          value="Organize component folder"
          onChange={() => {}}
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
        />
      </TasksListCell>
    </TasksListRow>
  )
})
