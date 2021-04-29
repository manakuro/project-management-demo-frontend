import React, { memo, useCallback, useMemo } from 'react'
import { CheckIcon, Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { useHover } from 'src/hooks/useHover'
import { TasksNameField } from './TasksNameField'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'
import { Mark } from './Mark'
import { useMarkMenuFocus } from './useMarkMenuFocus'
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
  const { ref, isHovering } = useHover()
  const { inputFocused } = useTasksName()
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
    <TasksNameProvider>
      <TasksNameCell ref={ref} onClick={handleTasksListDetailOpen}>
        <TasksNameGrabIcon show={showIcon} />
        <CheckIcon isDone={false} ml={4} />
        <TasksNameField
          value="Organize component folder"
          onChange={() => {}}
          focusedBorder
        />
        <Flex
          alignItems="center"
          ml="auto"
          display={showMark ? 'flex' : 'none'}
        >
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
    </TasksNameProvider>
  )
})
