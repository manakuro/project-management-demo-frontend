import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks'
import { transitions } from 'src/styles'

type Props = FlexProps

const maxH = 72 + 40 + 24
export const TasksCalendarContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle()

  return (
    <Flex
      flex={1}
      maxW={maxW}
      overflowY="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      transition={transitions.base()}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  )
})
TasksCalendarContent.displayName = 'TasksCalendarContent'
