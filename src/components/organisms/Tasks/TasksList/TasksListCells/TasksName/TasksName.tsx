import React, { memo, useCallback, useState } from 'react'
import { CheckIcon, Flex, FlexProps, Icon, Text } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useHover } from 'src/hooks/useHover'
import { TasksNameField } from './TasksNameField'
import { Mark } from './Mark'

type Props = FlexProps

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  const { ref, isHovering } = useHover()
  const [cellStyle, setCellStyle] = useState<FlexProps>()
  const handleInputFocused = useCallback(() => {
    setCellStyle({
      bg: 'white',
      borderColor: 'primary',
    })
  }, [])
  const handleInputBlur = useCallback(() => {
    setCellStyle({})
  }, [])

  return (
    <TasksListCell
      fontSize="sm"
      ref={ref}
      flex={1}
      cursor="pointer"
      {...cellStyle}
    >
      <Icon
        icon="gridVertical"
        color="text.muted"
        size="sm"
        visibility={isHovering ? 'visible' : 'hidden'}
        cursor="grab"
      />
      <CheckIcon isDone={false} ml={4} />
      <TasksNameField
        isHovering={isHovering}
        value="Organize component folder"
        onChange={() => {}}
        onInputFocus={handleInputFocused}
        onInputBlur={handleInputBlur}
      />
      <Flex
        alignItems="center"
        ml="auto"
        visibility={isHovering ? 'visible' : 'hidden'}
      >
        <Mark variant="unmarked" />
        <Text fontSize="xs" color="text.muted" ml={3}>
          Details
        </Text>
        <Icon icon="chevronRight" color="text.muted" mt="1px" />
      </Flex>
    </TasksListCell>
  )
})
