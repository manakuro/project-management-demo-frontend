import React, { memo, useCallback, useMemo } from 'react'
import { CheckIcon, Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useHover } from 'src/hooks/useHover'
import { TasksNameField } from './TasksNameField'
import { Mark } from './Mark'
import { useInputFocus } from './useInputFocus'
import { useMarkMenuFocus } from './useMarkMenuFocus'
import { useTasksListDetail } from 'src/components/organisms'

type Props = FlexProps

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  const { ref, isHovering } = useHover()
  const { cellStyle, inputFocused, onInputBlur, onInputFocus } = useInputFocus()
  const {
    markMenuFocused,
    onMarkMenuClosed,
    onMarkMenuOpened,
  } = useMarkMenuFocus()
  const showIcon = useMemo(() => isHovering || markMenuFocused, [
    isHovering,
    markMenuFocused,
  ])
  const showMark = useMemo(
    () => (isHovering || markMenuFocused) && !inputFocused,
    [isHovering, markMenuFocused, inputFocused],
  )
  const { setIsOpen } = useTasksListDetail()
  const handleTasksListDetailOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <TasksListCell
      fontSize="sm"
      ref={ref}
      flex={1}
      cursor="pointer"
      {...cellStyle}
      onClick={handleTasksListDetailOpen}
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
    </TasksListCell>
  )
})
