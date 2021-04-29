import React, { memo, useCallback, useMemo } from 'react'
import { CheckIcon, Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { useHover } from 'src/hooks/useHover'
import { TasksNameField } from './TasksNameField'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { Mark } from './Mark'
import { useInputFocus } from './useInputFocus'
import { useMarkMenuFocus } from './useMarkMenuFocus'
import { useTasksListDetail } from 'src/components/organisms'

type Props = FlexProps

export const TasksName: React.FC<Props> = memo<Props>(() => {
  const { ref, isHovering } = useHover()
  const { inputFocused, onInputBlur, onInputFocus } = useInputFocus()
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
    <TasksNameCell ref={ref} onClick={handleTasksListDetailOpen}>
      <TasksNameGrabIcon show={showIcon} />
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
    </TasksNameCell>
  )
})
